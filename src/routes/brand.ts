import { Router } from 'express';
import { BrandController } from '../controller/brand.controller';

const router = Router();
const brCtr = new BrandController();
router.post('/create', brCtr.createBrand);
router.get('/:id', brCtr.getBrandById);

export default router;
