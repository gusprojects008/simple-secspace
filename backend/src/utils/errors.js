import {http} from './http.js';

const ErrorCodes = {
  RESOURCE_ALREADY_EXISTS: 'RESOURCE_ALREADY_EXISTS',
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
  RESOURCE_CREATION_FAILED: 'RESOURCE_CREATION_FAILED',
  RESOURCE_UPDATE_FAILED: 'RESOURCE_UPDATE_FAILED',
  RESOURCE_DELETION_FAILED: 'RESOURCE_DELETION_FAILED',
  DATABASE_ERROR: 'DATABASE_ERROR',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
};

async function error(message = null, code) {
  const err = new Error(message);
  err.code = code;
  throw err; 
};

async function serverError(code, message = null, data = null) {
  response(res, 'INTERNAL_SERVER_ERROR', code, message, data);
};

const errors = {
  ErrorCodes,
  error,
  serverError
};

export {errors};
