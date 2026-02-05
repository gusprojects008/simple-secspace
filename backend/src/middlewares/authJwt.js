import jwt from 'jsonwebtoken';
import {http} from '../utils/http.js';
import {errors} from '@secspace/shared';

export default async function authJwt(req, res, next) {
  const auth = req.cookies?.token;
  console.log(auth);

  if (!auth) {
    return http.response(res, 'UNAUTHORIZED', errors.TOKEN_INVALID); 
  }

  try {
    const payload = jwt.verify(auth, process.env.JWT_SECRET)
    req.user = payload
    return next()
  } catch {
    return http.response(res, 'FORBIDDEN', errors.TOKEN_INVALID); 
  }
}
