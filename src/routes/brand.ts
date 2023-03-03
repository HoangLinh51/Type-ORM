import { Router } from 'express';
import { checkJwt } from '../middlewares/checkJwt';
import { BrandController } from '../controller/brand.controller';

const router = Router();
const brCtr = new BrandController();
router.post('/create', [checkJwt], brCtr.createBrand);
router.get('/:id', brCtr.getBrandById);
router.get('/', brCtr.list);
router.put('/update/:id', [checkJwt], brCtr.updateBrand);
router.delete('/:id', brCtr.delete);

export default router;
