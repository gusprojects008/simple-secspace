import bcrypt from 'bcrypt';
import {constants} from './constants.js';

export async function hashPassword(password) {
  return bcrypt.hash(password, 10);
};

export async function verifyPassword(password, passwordHash) {
  return bcrypt.compare(password, passwordHash);
};

export async function generateToken(user) {
  return jwt.sign(
    {id: user.id, email: user.email}, process.env.JWT_SECRET, {expiresIn: TOKEN_EXPIRES_IN}
  );
};

const security = {
  hashPassword,
  verifyPassword,
  generateToken
};

export {security};
