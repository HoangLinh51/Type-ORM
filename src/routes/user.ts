import { Router } from 'express';
import { checkJwt } from '../middlewares/checkJwt';
import { UserController } from '../controller/user.controller';

const router = Router();
const userCtr = new UserController();
router.post('/create', userCtr.createUser);
router.get('/search', userCtr.search);
router.get('/detail/:id', userCtr.getUserById);
router.put('/update/:id', [checkJwt], userCtr.updateUser);
router.delete('/:id', userCtr.delete);

export default router;
