import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {constants} from './constants.js';

async function hashPassword(password) {
  return bcrypt.hash(password, 10);
};

async function verifyPassword(password, passwordHash) {
  return bcrypt.compare(password, passwordHash);
};

async function generateToken(user) {
  return jwt.sign(
    {id: user.id, email: user.email}, process.env.JWT_SECRET, {expiresIn: constants.TOKEN_EXPIRES_IN}
  );
};

const security = {
  hashPassword,
  verifyPassword,
  generateToken
};

export {security};
