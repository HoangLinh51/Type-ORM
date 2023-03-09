import { Router } from 'express';
import { checkJwt } from '../middlewares/checkJwt';
import { ProductController } from '../controller/product.controller';

const router = Router();
const prdCtr = new ProductController();
router.post('/create', [checkJwt], prdCtr.createProduct);
router.get('/:id', prdCtr.getProductById);
router.get('/', prdCtr.list);
router.put('/update/:id', [checkJwt], prdCtr.updateProduct);
router.delete('/:id', prdCtr.delete);

export default router;
