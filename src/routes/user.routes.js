
import { Router } from "express"
import { methods as userController } from "../controllers/user.controller"

const router =  Router()

router.post('/', userController.createUser);
router.get('/by-username/:username', userController.getUser);
router.get('/:id', userController.getUserById);
router.get('/', userController.getUsers);
router.post('/login', userController.loginUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;