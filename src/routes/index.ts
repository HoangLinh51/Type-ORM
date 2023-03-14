import { Router } from 'express';
import auth from './auth';
import user from './user';
import brand from './brand';
import category from './category';
import product from './product';
import admin from './admin';
import router from './auth';

const routes = Router();

routes.use('/auth', auth);
router.use('/admin', admin);
routes.use('/user', user);
routes.use('/brand', brand);
routes.use('/category', category);
routes.use('/product', product);

export default routes;
