import {ReasonPhrases, StatusCodes} from 'http-status-codes';
import {constants} from './constants.js';

export async function response(res, status_key, code = null, message = null, data = null) {
  const status_code = StatusCodes[status_key] || StatusCodes.INTERNAL_SERVER_ERROR;
  res.status(status_code).json({
    code: code,
    message: message,
    data: data,
  });
};

export async function createAuthCookie(
  res,
  token,
  httpOnly = true,
  secure = process.env.NODE_ENV === 'production',
  sameSite = 'strict',
  maxAge = constants.TOKEN_EXPIRES_IN * 1000
) {
  res.cookie('token', token, {
    httpOnly,
    secure,
    sameSite,
    maxAge
  });
}

const http = {response, createAuthCookie};

export {http};

