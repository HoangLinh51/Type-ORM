import { Router } from 'express';
import auth from './auth';
import user from './user';
import brand from './brand';
import category from './category';
import Product from './product';

const routes = Router();

routes.use('/auth', auth);
routes.use('/user', user);
routes.use('/brand', brand);
routes.use('/category', category);
routes.use('/product', Product);

export default routes;
