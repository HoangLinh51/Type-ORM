import { AppDataSource } from '../conectdb';
import { User } from '../entity/user';
import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { GetUserIdLogin } from '../middlewares/checkJwt';

export class BrandController {
  async createUser(req: Request, res: Response) {
    const repository = AppDataSource.getRepository(User);
    const { email, password, firstName, lastName, phone } = req.body;
    const newUser = new User();

    newUser.email = email;
    newUser.password = password;
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.phone = phone;

    // hashpassword
    newUser.hashPassword();

    // check if email or email exist alreay
    const user = await repository.createQueryBuilder('u').where('u.email = :email', { email }).getOne();
    if (user) {
      res.status(400).send({ message: 'email is already taken' });
    } else {
      const response = await repository.save(newUser);
      res.status(200).send(response);
    }
  }

  async getUserById(req: Request, res: Response) {
    const repository = AppDataSource.getRepository(User);
    const { id } = req.params;
    const response = await repository.createQueryBuilder().where('id = :id', { id }).andWhere('isDeleted = FALSE').getOne();
    res.status(200).send(response);
  }

  async list(req: Request, res: Response) {
    const repository = AppDataSource.getRepository(User);
    const response = await repository.createQueryBuilder().where('isDeleted = FALSE').getManyAndCount();
    res.status(200).send(response);
  }

  async updateUser(req: Request, res: Response) {
    const repository = AppDataSource.getRepository(User);
    const { id } = req.params;
    const { email, password, firstName, lastName, phone } = req.body;

    const newUser = new User();

    const userId = GetUserIdLogin();
    if (!userId) {
      res.status(401).send('Token invalid');
    }
    newUser.email = email;
    newUser.password = password;
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.phone = phone;
    newUser.updatedAt = new Date();
    newUser.updatedBy = userId;

    const response = await repository
      .createQueryBuilder()
      .update(User)
      .set({ firstName: firstName, lastName: lastName, phone: phone, email: email, updatedAt: new Date(), updatedBy: userId })
      .where('id = :id', { id })
      .execute();
    res.status(200).send({ message: 'Information has been updated' });
  }

  async delete(req: Request, res: Response) {
    const repository = AppDataSource.getRepository(User);
    const { id } = req.params;
    const response = await repository.createQueryBuilder().update(User).set({ isDeleted: true }).where('id = :id', { id }).execute();
    res.status(200).send(response);
  }
}
