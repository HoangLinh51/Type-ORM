import { Router } from 'express';
import { checkJwt } from '../middlewares/checkJwt';
import { CategoryController } from '../controller/category.controller';

const router = Router();
const ctgCtr = new CategoryController();
router.post('/create', [checkJwt], ctgCtr.createCategory);
router.get('/detail/:id', ctgCtr.getCategoryById);
router.get('/search', ctgCtr.search);
router.put('/update/:id', [checkJwt], ctgCtr.updateCategory);
router.delete('/:id', ctgCtr.delete);

export default router;
