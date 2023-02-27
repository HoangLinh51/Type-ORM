import { Router } from 'express';
import { checkJwt } from '../middlewares/checkJwt';
import { BrandController } from '../controller/brand.controller';

const router = Router();
const brCtr = new BrandController();
router.post('/create', [checkJwt], brCtr.createBrand);
router.get('/:id', brCtr.getBrandById);
router.get('/', brCtr.list);

export default router;
