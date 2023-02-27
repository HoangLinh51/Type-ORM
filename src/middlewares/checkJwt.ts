import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { CustomError } from '../utils/response/custom-error';
import config from '../config/config';
import { CreateTotken } from '../utils/jwt';

let userIDLogin: number = null;

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    const customError = new CustomError(401, 'General', 'Authorization header not provided');
    return next(customError);
  }

  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const customError = new CustomError(400, 'General', 'Authorization header not provided');
    return next(customError);
  }

  let token = req.headers.authorization as string;
  let jwtPayload: { id: number };
  if (token.startsWith('Bearer ')) {
    token = token.split(' ')[1];
  }
  if (!token) {
    const customError = new CustomError(401, 'Raw', 'JWT error', null);
    return next(customError);
  }
  try {
    jwtPayload = jwt.verify(token, config.jwtSecret) as any;
    res.locals.jwtPayload = jwtPayload;
  } catch (err) {
    const customError = new CustomError(401, 'Raw', 'JWT error', null, err);
    return next(customError);
  }

  const { id } = jwtPayload;
  const newToken = CreateTotken(id);
  res.setHeader('Authorization', 'Bearer ' + newToken);
  userIDLogin = id;
  return next();
};

export function GetUserIdLogin(): number {
  return userIDLogin;
}
