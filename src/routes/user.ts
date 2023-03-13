import { Router } from 'express';
// import { UserController }
import { UserController } from '../controller/admin.controller';

const router = Router();
const userCtr = new UserController();
router.post('/create', userCtr.createUser);
router.get('/search', userCtr.list);
router.get('/detail/:id', userCtr.getUserById);

export default router;
