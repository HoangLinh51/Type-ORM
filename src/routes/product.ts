import { Router } from 'express';
import { checkJwt } from '../middlewares/checkJwt';
import { ProductController } from '../controller/product.controller';

const router = Router();
const prdCtr = new ProductController();
router.post('/create', [checkJwt], prdCtr.createBrand);
router.get('/:id', prdCtr.getBrandById);
router.get('/', prdCtr.list);
router.put('/update/:id', [checkJwt], prdCtr.updateBrand);
router.delete('/:id', prdCtr.delete);

export default router;
