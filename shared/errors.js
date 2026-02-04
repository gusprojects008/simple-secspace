import {http} from './http.js';

const ErrorCodes = {
  RESOURCE_ALREADY_EXISTS: 'RESOURCE_ALREADY_EXISTS',
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
  RESOURCE_CREATION_FAILED: 'RESOURCE_CREATION_FAILED',
  RESOURCE_UPDATE_FAILED: 'RESOURCE_UPDATE_FAILED',
  RESOURCE_DELETION_FAILED: 'RESOURCE_DELETION_FAILED',
  RESOURCE_NOT_SUPPORTED: 'RESOURCE_NOT_SUPPORTED',
  RESOURCE_INVALID: 'RESOURCE_INVALID',
  DATABASE_ERROR: 'DATABASE_ERROR',
  CREDENTIALS_INVALID: 'CREDENTIALS_INVALID',
  TOKEN_INVALID: 'TOKEN_INVALID',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
};

function error(code, message = null, data = null) {
  const err = new Error(message);
  err.code = code;
  throw err; 
};

async function serverError(res, code, message = null, data = null) {
  http.response(res, 'INTERNAL_SERVER_ERROR', code, message, data);
};

const errors = {
  ErrorCodes,
  error,
  serverError
};

export {errors};
