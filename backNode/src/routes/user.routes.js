import express from 'express';
import userController from '../controllers/user.controller.js';
import accessService from "../service/access.service.js";

const router = express.Router();

router.get('/', userController.getUsers);
router.get('/:id', userController.getUsers);
router.put('/', checkAccess, userController.updateUser);
router.delete('/:id', checkAccess, userController.deleteUser);

export default router;

export async function checkAccess(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    const user = await accessService.getWhiteLists(token);

    console.log("req params", req.params.id, "req body", req.body.userId, "user whitelist", user[0][0])
    try {
        if (!user.access === 'Adm') {

            if (user.user_id !== req.params.id && !req.body.userId !== user.user_id) {
                return res.status(401).json({ msg: 'Acesso negado!' });
            }
        }
        next();
    } catch (err) {
        next(err);
    }
}