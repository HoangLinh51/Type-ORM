import { Router } from 'express';
import { UserController } from '../controller/user.controller';

const router = Router();
const userCtr = new UserController();
router.post('/', userCtr.createUser);

export default router;
