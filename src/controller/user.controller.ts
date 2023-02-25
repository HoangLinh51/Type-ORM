import { AppDataSource } from '../conectdb';
import { User } from '../entity/user';
import { Request, Response } from 'express';
import { Repository } from 'typeorm';

export class UserController {
  // repository: Repository<User> = null;
  // constructor() {
  //   this.repository = AppDataSource.getRepository(User);
  // }

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
}
