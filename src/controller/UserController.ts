import { Request, Response } from 'express';
import { User } from '../entity/User';
import { AppDataSource } from '../conectdb';

export default class UserController {
  public static createUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const newUser = new User();
    const repository = AppDataSource(User);

    newUser.email = email;
    newUser.password = password;

    // hashpassword
    newUser.hashPassword();

    // check if email or email exist alreay
    const user = await repository.findOne({ where: { email } });
    if (user) {
      res.status(400).send({ message: 'email is already taken' });
    } else {
      const response = await repository.save(newUser);

      res.status(200).send(response);
    }
  };
}
