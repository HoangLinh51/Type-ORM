import { Router } from 'express';
import { checkJwt } from '../middlewares/checkJwt';
import { Admincontroller } from '../controller/admin.controller';

const router = Router();
const adCtl = new Admincontroller();
router.post('/create', [checkJwt], adCtl.createUser);
router.get('/detail/:id', adCtl.getUserById);
router.get('/search', adCtl.search);
router.put('/update/:id', [checkJwt], adCtl.updateUser);
router.delete('/:id', adCtl.delete);

export default router;
