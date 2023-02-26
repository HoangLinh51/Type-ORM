import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { CustomError } from '../utils/response/custom-error';
import config from '../config/config';
import { CreateTotken } from 'src/utils/jwt';

let userIDLogin: number = null;

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const customError = new CustomError(400, 'General', 'Authorization header not provided');
    return next(customError);
  }

  let token = req.headers.authorization as string;
  let jwtPayload: { userId: number };
  if (token.startsWith('Bearer ')) {
    token = token.split(' ')[1];
  }

  try {
    jwtPayload = jwt.verify(token, config.jwtSecret) as any;
    res.locals.jwtPayload = jwtPayload;
  } catch (err) {
    const customError = new CustomError(401, 'Raw', 'JWT error', null, err);
    return next(customError);
  }

  const { userId } = jwtPayload;
  const newToken = CreateTotken(userId);
  res.setHeader('Authorization', 'Bearer ' + newToken);
  userIDLogin = userId;

  return next();
};

export function GetUserIdLogin(): Number {
  return userIDLogin;
}
