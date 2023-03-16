
import PostModel from '../models/Post.js';
import CommentModel from '../models/Comment.js';

export const getLastTags = async (req, res) => {
    try {
        const posts = await PostModel.find().sort({ createdAt: -1 }).exec();
        const uniqTags = new Set(posts
            .map((obj) => obj.tags)
            .flat())

        const tags = [...uniqTags].slice(0, 10);

        res.json(tags);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить тэги',
        });
    }
};

export const getPopularTags = async (req, res) => {
    try {
        const posts = await PostModel.find().exec();
        const allTags = posts.map((obj) => obj.tags).flat()
        const uniqTagsWithCount = []

        allTags.forEach(elem => {
            let i = -1
            uniqTagsWithCount.forEach((obj, index) => {
                if (obj.tagName === elem) {
                    i = index
                }
            });
            (i == -1) ? (uniqTagsWithCount.push({ tagName: elem, count: 1 })) : (
                uniqTagsWithCount[i].count += 1
            )
        })
        const popTags = uniqTagsWithCount.sort((a, b) => b.count - a.count)
            .map((elem) => elem.tagName).slice(0, 10)

        res.json(popTags);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить тэги',
        });
    }
};

export const getAll = async (req, res) => {
    try {
        const sort = req.params.sort
        let posts = {}
        switch (sort) {
            case 'new':
                posts = await PostModel.find().sort({ createdAt: -1 }).populate('user').exec();
                break;
            case 'pop':
                posts = await PostModel.find().sort({ viewsCount: -1 }).populate('user').exec();
                break;
            default:
                console.log('err');
                res.status(500).json({
                    message: 'Не корректные параметры сортировки',
                });
                break;
        }
        res.json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить статьи',
        });
    }
};

// export const getAllNew = async (req, res) => {
//     try {
//         const posts = await PostModel.find().sort({ createdAt: -1 }).populate('user').exec();
//         res.json(posts);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({
//             message: 'Не удалось получить статьи',
//         });
//     }
// };

// export const getAllPopular = async (req, res) => {
//     try {
//         const posts = await PostModel.find().sort({ viewsCount: -1 }).populate('user').exec();
//         res.json(posts);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({
//             message: 'Не удалось получить статьи',
//         });
//     }
// };

export const getPostsWithTag = async (req, res) => {
    try {
        const tag = req.params.tagName
        const sort = req.params.sort
        let posts = {}
        switch (sort) {
            case 'new':
                posts = await PostModel.find(
                    {
                        tags: {
                            $in: [tag]
                        }
                    }
                ).sort({ createdAt: -1 }).populate('user').exec();
                break;
            case 'pop':
                posts = await PostModel.find(
                    {
                        tags: {
                            $in: [tag]
                        }
                    }
                ).sort({ viewsCount: -1 }).populate('user').exec();
                break;
            default:
                console.log('err');
                res.status(500).json({
                    message: 'Не корректные параметры сортировки',
                });
                break;
        }
        res.json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить статьи',
        });
    }
};

export const getOne = async (req, res) => {
    try {
        const id = req.params.id;
        // console.log(id);
        PostModel.findOneAndUpdate(
            {
                _id: id,
            },
            {
                $inc: { viewsCount: 1 },
            },
            {
                returnDocument: 'after',
            },
            (err, doc) => {
                if (err) {
                    return res.status(500).json({
                        message: 'Не удалось вернуть статью',
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Статья не найдена',
                    });
                }

                res.json(doc);
            },
        ).populate('user');
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить статью',
        });
    }
};

export const remove = async (req, res) => {
    try {
        const postId = req.params.id;

        PostModel.findOneAndDelete(
            {
                _id: postId,
            },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'Не удалось удалить статью',
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Статья не найдена',
                    });
                }
            },
        );
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить статью',
        });
    }

    try {
        const postId = req.params.id;
        CommentModel.deleteMany(
            {
                post: postId,
            },
            (err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'Не удалось удалить коментарии к статье',
                    });
                }
                res.json({
                    success: true,
                });
            },
        );
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось удалить комментарии',
        });
    }
};

export const create = async (req, res) => {
    const tagsWisautSpases = req.body.tags.split(',').map((elem) => elem.trim())
    const tags = (tagsWisautSpases[0] === '') ? [] : tagsWisautSpases

    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: tags,
            user: req.userId,
        });

        const post = await doc.save();

        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось создать статью',
        });
    }
};

export const update = async (req, res) => {
    try {
        const postId = req.params.id;
        const tagsWisautSpases = req.body.tags.split(',').map((elem) => elem.trim())
        const tags = (tagsWisautSpases[0] === '') ? [] : tagsWisautSpases
        const post = await PostModel.updateOne(
            {
                _id: postId,
            },
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                user: req.userId,
                tags: tags,
            },
        );

        res.json({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            user: req.userId,
            tags: tags,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось обновить статью',
        });
    }
};