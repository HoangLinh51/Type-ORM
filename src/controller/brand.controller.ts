import { AppDataSource } from '../conectdb';
import { Brands } from '../entity/brands';
import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { GetUserIdLogin } from '../middlewares/checkJwt';
import { Categories } from 'src/entity/categories';

export class BrandController {
  async createBrand(req: Request, res: Response) {
    const repository = AppDataSource.getRepository(Brands);
    const { brandName, description } = req.body;
    const newBrand = new Brands();

    const userId = GetUserIdLogin();
    if (!userId) {
      res.status(401).send('Token invalid');
    }

    newBrand.brandName = brandName;
    newBrand.description = description;
    newBrand.createdAt = new Date();
    newBrand.createdBy = userId;

    const brand = await repository.createQueryBuilder('b').where('b.brandName = :brandName', { brandName }).getOne();
    if (brand) {
      res.status(400).send({ message: 'Brand is already taken' });
    } else {
      const response = await repository.save(newBrand);
      res.status(200).send(response);
    }
  }

  async getBrandById(req: Request, res: Response) {
    const repository = AppDataSource.getRepository(Brands);
    const { id } = req.params;
    const response = await repository.createQueryBuilder().where('id = :id', { id }).andWhere('isDeleted = FALSE').getOne();
    res.status(200).send(response);
  }

  async search(req: Request, res: Response) {
    const repository = AppDataSource.getRepository(Brands);
    const brandName = req.query.name;

    const page: string = (req.query.page as string) || '1';
    const p = parseInt(page);
    const take: string = (req.query.take as string) || '2';
    const t = parseInt(take);

    let skip = (p - 1) * t;
    if (skip < 0) {
      skip = 0;
    }
    const query = repository.createQueryBuilder('q').where('q.isDeleted = FALSE');
    if (brandName) {
      query.andWhere('q.brandName LIKE :brandName', { brandName });
    }

    const response = await query.take(t).skip(skip).getMany();
    res.status(200).send(response);
  }

  async updateBrand(req: Request, res: Response) {
    const repository = AppDataSource.getRepository(Brands);
    const { id } = req.params;
    const { brandName, brandInformation } = req.body;

    const newBrand = new Brands();

    const userId = GetUserIdLogin();
    if (!userId) {
      res.status(401).send('Token invalid');
    }
    newBrand.updatedAt = new Date();
    newBrand.updatedBy = userId;

    const response = await repository
      .createQueryBuilder()
      .update(Brands)
      .set({ brandName: brandName, description: brandInformation, updatedAt: new Date(), updatedBy: userId })
      .where('id = :id', { id })
      .execute();
    res.status(200).send({ message: 'Information has been updated' });
  }

  async delete(req: Request, res: Response) {
    const repository = AppDataSource.getRepository(Brands);
    const { id } = req.params;
    const response = await repository.createQueryBuilder().update(Brands).set({ isDeleted: true }).where('id = :id', { id }).execute();
    res.status(200).send(response);
  }
}
