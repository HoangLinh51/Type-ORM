import { Router } from 'express';
import { checkJwt } from '../middlewares/checkJwt';
import { ProductController } from '../controller/product.controller';

const router = Router();
const prdCtr = new ProductController();
router.post('/create', [checkJwt], prdCtr.createProduct);
router.get('/search', prdCtr.search);
router.get('/detail/:id', prdCtr.getProductById);
router.put('/update/:id', [checkJwt], prdCtr.updateProduct);
router.delete('/:id', prdCtr.delete);

export default router;
