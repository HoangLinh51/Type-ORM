import { Router } from 'express';
import { checkJwt } from '../middlewares/checkJwt';
import { CategoryController } from '../controller/category.controller';

const router = Router();
const ctgCtr = new CategoryController();
router.post('/create', [checkJwt], ctgCtr.createBrand);
router.get('/:id', ctgCtr.getBrandById);
router.get('/', ctgCtr.list);
router.put('/update/:id', [checkJwt], ctgCtr.updateBrand);
router.delete('/:id', ctgCtr.delete);

export default router;
