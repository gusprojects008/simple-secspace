import jwt from 'jsonwebtoken';
import {http} from '../utils/http.js';
import {errors} from '../utils/errors.js';

export default async function authJwt(req, res, next) {
  const auth = req.headers.authorization;

  if (!auth) {
    return http.response(res, 'UNAUTHORIZED', errors.TOKEN_INVALID); 
  }

  const token = auth.split(" ")[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = payload
    return next()
  } catch {
    return http.response(res, 'FORBIDDEN', errors.TOKEN_INVALID); 
  }
}
