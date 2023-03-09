import { AppDataSource } from '../conectdb';
import { Categories } from '../entity/categories';
import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { GetUserIdLogin } from '../middlewares/checkJwt';

export class CategoryController {
  async createBrand(req: Request, res: Response) {
    const repository = AppDataSource.getRepository(Categories);
    const { categoryName } = req.body;
    const newCategory = new Categories();

    const userId = GetUserIdLogin();
    if (!userId) {
      res.status(401).send('Token invalid');
    }

    newCategory.categoryName = categoryName;
    newCategory.createdAt = new Date();
    newCategory.createdBy = userId;

    const category = await repository.createQueryBuilder('c').where('c.categoryName = :categoryName', { categoryName }).getOne();
    if (category) {
      res.status(400).send({ message: 'Category is already taken' });
    } else {
      const response = await repository.save(newCategory);
      res.status(200).send(response);
    }
  }

  async getBrandById(req: Request, res: Response) {
    const repository = AppDataSource.getRepository(Categories);
    const { id } = req.params;
    const response = await repository.createQueryBuilder().where('id = :id', { id }).andWhere('isDeleted = FALSE').getOne();
    res.status(200).send(response);
  }

  async list(req: Request, res: Response) {
    const repository = AppDataSource.getRepository(Categories);
    const response = await repository.createQueryBuilder().where('isDeleted = FALSE').getManyAndCount();
    res.status(200).send(response);
  }

  async updateBrand(req: Request, res: Response) {
    const repository = AppDataSource.getRepository(Categories);
    const { id } = req.params;
    const { categoryName } = req.body;

    const newCategory = new Categories();

    const userId = GetUserIdLogin();
    if (!userId) {
      res.status(401).send('Token invalid');
    }
    newCategory.updatedAt = new Date();
    newCategory.updatedBy = userId;

    const response = await repository
      .createQueryBuilder()
      .update(Categories)
      .set({ categoryName: categoryName, updatedAt: new Date(), updatedBy: userId })
      .where('id = :id', { id })
      .execute();
    res.status(200).send({ message: 'Category Name has been updated' });
  }

  async delete(req: Request, res: Response) {
    const repository = AppDataSource.getRepository(Categories);
    const { id } = req.params;
    const response = repository.createQueryBuilder().update(Categories).set({ isDeleted: true }).where('id = :id', { id }).execute();
    res.status(200).send(response);
  }
}
