import {authService} from '../services/auth.js';
import {getProvider} from '../adapters/oauth/index.js';
import {http} from '../utils/http.js';
import {constants} from '../utils/constants.js';
import {security} from '../utils/security.js';
import {errors} from '../utils/errors.js';

const {
  RESOURCE_ALREADY_EXISTS,
  RESOURCE_CREATION_FAILED,
  RESOURCE_NOT_FOUND,
  INVALID_CREDENTIALS,
  DATABASE_ERROR,
  VALIDATION_ERROR,
} = errors.ErrorCodes;

async function register(req, res) {
  const {username, email, password} = req.body;
  if (!username || !email || !password) {
    return http.response(res, 'BAD_REQUEST', VALIDATION_ERROR);
  }
  try {
    const user = await authService.register(username, email, password);
    return http.response(res, 'CREATED', null, null, user);
  } catch (err) {
    if (err.code === RESOURCE_ALREADY_EXISTS) {
      return http.response(res, 'CONFLICT', err.code, err);
    }
    return errors.serverError(res, DATABASE_ERROR);
  }
}

async function login(req, res) {
  const {email, password} = req.body;

  if (!email || !password) {
    return http.response(res, 'BAD_REQUEST', VALIDATION_ERROR);
  }

  try {
    const {user, token} = await authService.login(email, password);
    http.createAuthCookie(res, token);
    return http.response(res, 'OK', null, null, user);
  } catch (err) {
    if (err.code === RESOURCE_NOT_FOUND) {
      return http.response(res, 'NOT_FOUND', err.code);
    }
    if (err.code === INVALID_CREDENTIALS) {
      return http.response(res, 'UNAUTHORIZED', err.code);
    }
    console.log(err);
    return errors.serverError(res, DATABASE_ERROR);
  }
}

async function oauthLogin(req, res) {
  const {provider} = req.params;

  const adapter = getProvider(provider);
  const url = await adapter.getAuthUrl();

  res.redirect(url);
}

async function oauthCallback(req, res) {
  const {provider} = req.params;
  const code = req.query.code;

  try {
    const adapter = getProvider(provider);
    const payload = await adapter.handleCallback(code);
    payload.provider = provider;

    const {user, token} = await authService.loginWithProvider(payload);

    req.session.userId = user.id;
    http.createAuthCookie(res, token);
    res.redirect('/');
  } catch (err) {
    console.log(err);
    errors.serverError(res, DATABASE_ERROR, null, err);
  }
}

const authController = {
  register,
  login,
  oauthLogin,
  oauthCallback
};

export {authController};
