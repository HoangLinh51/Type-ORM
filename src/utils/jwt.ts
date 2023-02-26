import * as jwt from 'jsonwebtoken';
import config from '../config/config';

export function CreateTotken(userId: number) {
  return jwt.sign({ id: userId }, config.jwtSecret, { expiresIn: '30m' });
}
