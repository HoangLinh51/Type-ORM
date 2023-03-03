import { Router } from 'express';
import auth from './auth';
import user from './user';
import brand from './brand';
import category from './category';

const routes = Router();

routes.use('/auth', auth);
routes.use('/user', user);
routes.use('/brand', brand);
routes.use('/category', category);

export default routes;
