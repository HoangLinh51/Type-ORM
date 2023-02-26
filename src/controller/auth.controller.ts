import * as bcrypt from 'bcryptjs';
import { AppDataSource } from '../conectdb';
import { User } from '../entity/user';
import { Request, Response } from 'express';
import { Repository } from 'typeorm';

export class AuthController {
  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
  async login(req: Request, res: Response) {
    const repository = AppDataSource.getRepository(User);
    const { email, password } = req.body;
    const hashPassword;
    const user = await repository
      .createQueryBuilder('u')
      .where('u.email = :email', { email })
      // .andWhere('u.password = :password', { password })
      .getOne();
    if (!user) {
      return res.status(401).json({ message: 'Login Fail' });
    } else {
      return res.status(200).json({ message: 'Login Success' });
    }
  }
}
