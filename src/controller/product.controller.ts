import { AppDataSource } from '../conectdb';
import { Product } from '../entity/products';
import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { GetUserIdLogin } from '../middlewares/checkJwt';

export class ProductController {
  async createBrand(req: Request, res: Response) {
    const repository = AppDataSource.getRepository(Product);
    const { productName, productDescription, productPrice } = req.body;
    const newProduct = new Product();

    const userId = GetUserIdLogin();
    if (!userId) {
      res.status(401).send('Token invalid');
    }

    newProduct.productName = productName;
    newProduct.productDescription = productDescription;
    newProduct.productPrice = productPrice;
    newProduct.createdAt = new Date();
    newProduct.createdBy = userId;

    const brand = await repository.createQueryBuilder('p').where('p.productName = :productName', { productName }).getOne();
    if (brand) {
      res.status(400).send({ message: 'Product is already taken' });
    } else {
      const response = await repository.save(newProduct);
      res.status(200).send(response);
    }
  }

  async getBrandById(req: Request, res: Response) {
    const repository = AppDataSource.getRepository(Product);
    const { id } = req.params;
    const response = await repository.createQueryBuilder().where('id = :id', { id }).andWhere('isDeleted = FALSE').getOne();
    res.status(200).send(response);
  }

  async list(req: Request, res: Response) {
    const repository = AppDataSource.getRepository(Product);
    const response = await repository.createQueryBuilder().where('isDeleted = FALSE').getManyAndCount();
    res.status(200).send(response);
  }

  async updateBrand(req: Request, res: Response) {
    const repository = AppDataSource.getRepository(Product);
    const { id } = req.params;
    const { productName, productDescription, productPrice } = req.body;

    const newProduct = new Product();

    const userId = GetUserIdLogin();
    if (!userId) {
      res.status(401).send('Token invalid');
    }
    newProduct.updatedAt = new Date();
    newProduct.updatedBy = userId;

    const response = await repository
      .createQueryBuilder()
      .update(Product)
      .set({ productName: productName, productDescription: productDescription, productPrice: productPrice, updatedAt: new Date(), updatedBy: userId })
      .where('id = :id', { id })
      .execute();
    res.status(200).send({ message: 'Information has been updated' });
  }

  async delete(req: Request, res: Response) {
    const repository = AppDataSource.getRepository(Product);
    const { id } = req.params;
    const response = await repository.createQueryBuilder().update(Product).set({ isDeleted: true }).where('id = :id', { id }).execute();
    res.status(200).send(response);
  }
}
