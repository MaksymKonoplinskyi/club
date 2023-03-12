import jwt from 'jsonwebtoken';
import PostModel from '../models/Post.js';

export default async (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        try {

            const postId = req.params.id
            const { user } = await PostModel.findOne(
                {
                    _id: postId,
                }
            );
            const decoded = jwt.verify(token, 'secret123');
            if (user.toString() === decoded._id) {
                next()
            } else {
                return res.status(403).json({
                    message: 'Нет доступа (Чужой пост)',
                })
            }
        } catch (e) {
            return res.status(403).json({
                message: 'Нет доступа',
            });
        }
    } else {
        return res.status(403).json({
            message: 'Нет доступа (Вы не авторизированы)',
        });
    }
};   