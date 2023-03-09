import { Router } from 'express';

import { UserController } from '../controller/user.controller';

const router = Router();
const userCtr = new UserController();
router.post('/create', userCtr.createUser);
router.get('/:id', userCtr.getUserById);

export default router;
