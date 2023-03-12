
import CommentModel from '../models/Comment.js';
import PostModel from '../models/Post.js';

export const create = async (req, res) => {
    try {
        const doc = new CommentModel({
            text: req.body.text,
            post: req.body.postId,
            user: req.userId,
        });
        const comment = await doc.save();
        PostModel.findOneAndUpdate(
            {
                _id: req.body.postId,
            },
            {
                $inc: { commentsCount: 1 },
            },
            {
                returnDocument: 'after',
            },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'Не удалось изменить количество комментариев',
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Статья не найдена',
                    });
                }

                // res.json(doc);
            },
        );
        res.json(comment);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось создать комментарий',
        });
    }
};

export const getAll = async (req, res) => {
    try {
        const postId = req.params.postId;
        const comments = await CommentModel.find(
            {
                post: postId,
            }
        ).populate('user')//.exec();
        res.json(comments);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить комментарии',
        });
    }
};

export const getOne = async (req, res) => {
    try {
        const commentId = req.params.id;
        const comment = await CommentModel.findOne(
            {
                _id: commentId,
            }
        );
        res.json(comment);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить комментарии',
        });
    }
};

export const update = async (req, res) => {
    try {
        const commentId = req.params.id;

        await CommentModel.updateOne(
            {
                _id: commentId,
            },
            {
                text: req.body.text,
            },
        );

        res.json({
            text: req.body.text,
            user: req.userId,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось обновить комментарий',
        });
    }
};

export const remove = async (req, res) => {
    try {
        const commentId = req.params.id;
        CommentModel.findOneAndDelete(
            {
                _id: commentId,
            },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'Не удалось удалить комментарий',
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Комментарий не найден',
                    });
                }
                const postId = doc.post.toString()

                PostModel.findOneAndUpdate(
                    {
                        _id: postId,
                    },
                    {
                        $inc: { commentsCount: -1 },
                    },
                    {
                        returnDocument: 'after',
                    },
                    (err, doc) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).json({
                                message: 'Не удалось изменить количество комментариев',
                            });
                        }

                        if (!doc) {
                            return res.status(404).json({
                                message: 'Статья не найдена',
                            });
                        }

                        // res.json(doc);
                    },
                );

               
                res.json({
                    success: true,
                });
            },
        );

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить статьи',
        });
    }
};



