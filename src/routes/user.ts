import { Router } from 'express';
import { checkJwt } from '../middlewares/checkJwt';
import { UserController } from '../controller/user.controller';
import { BrandController } from '../controller/brand.controller';

const router = Router();
const userCtr = new UserController();
router.post('/', userCtr.createUser);

export default router;
