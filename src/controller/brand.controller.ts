import { AppDataSource } from '../conectdb';
import { Brands } from '../entity/brands';
import { Request, Response } from 'express';
import { Repository } from 'typeorm';

export class BrandController {
  async createBrand(req: Request, res: Response) {
    const repository = AppDataSource.getRepository(Brands);
    const { brandName, brandInformation, date } = req.body;
    const newBrand = new Brands();

    newBrand.brandName = brandName;
    newBrand.description = brandInformation;
    newBrand.date = date;

    // console.log('brand', newBrand);

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
    const response = await repository.findOneBy({ id });
    res.status(200).send(response);
  }
}
