import jwt from 'jsonwebtoken';
import CommentModel from '../models/Comment.js';

export default async (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        try {

            const commentId = req.params.id
            const { user } = await CommentModel.findOne(
                {
                    _id: commentId,
                }
            )
            const decoded = jwt.verify(token, 'secret123');
            if (user.toString() === decoded._id) {
                next()
            } else {
                return res.status(403).json({
                    message: 'Нет доступа (Чужой комментарий)',
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