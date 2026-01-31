import jwt from 'jsonwebtoken';
import {http} from '../utils/http.js';

export default async function authJwt(req, res, next) {
  const auth = req.header.authorization;
  const errorResponse = http.response(res, 'UNAUTHORIZED');
  if (!auth) {
    return errorResponse;
  };
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    errorResponse;
  };
};
