import { User } from '../entity/user';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { AppDataSource } from '../conectdb';
import config from '../config/config';

export default class AuthController {
  public static login = async (req: Request, res: Response) => {
    const body: { email: string; password: string } = req.body;
    const userRepository = AppDataSource(User);
    // if (!(email && password)) {
    //   res.status(400).send();
    // }

    // Check if user exists
    // const user = await userRepository
    const user = await AppDataSource.getRepository(User)
      .createQueryBuilder('u')

      .where('u.email = :email', { email: body.email })
      .andWhere('u.password = :password', { password: body.password })
      .getOne();
    if (!user) {
      res.status(404).send({ message: 'Incorrect user or password' });
      return;
    }
    // Check if encrypted password match
    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      res.status(404).send({ message: 'Incorrect user or password' });
      return;
    }

    AuthController.signJwt(user, res);
  };

  public static signJwt(user: User, res) {
    // Sing JWT, valid for 1 hour
    const token = jwt.sign({ userId: user.id, username: user.email }, config.jwtSecret, { expiresIn: '1h' });
    const firstTimeLoggedIn = false;
    try {
      // Send the jwt in the response
      res.send({
        jwt: token,
      });
    } catch (error) {
      res.status(401).send();
    }
  }
}
