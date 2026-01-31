import {authService} from '../services/auth.js';
import {googleAdapter} from '../adapters/google.js';
import {http} from '../utils/http.js';
import {constants} from '../utils/constants.js';
import {security} from '../utils/security.js';
import {errors} from '../utils/errors.js';

const {
  USER_ALREADY_EXISTS,
  USER_NOT_FOUND,
  INVALID_CREDENTIALS,
  DATABASE_ERROR,
  VALIDATION_ERROR,
} = errors.ErrorCodes;

async function register(req, res) {
  const {username, email, password} = req.body;

  if (!username || !email || !password) {
    http.response(res, 'BAD_REQUEST', VALIDATION_ERROR);
    return;
  }

  try {
    const user = await authService.createUser(username, email, password);
    http.response(res, 'CREATED', null, null, user);
  } catch (err) {
    if (err.code === USER_ALREADY_EXISTS) {
      http.response(res, 'CONFLICT', err.code);
      return;
    }
    errors.serverError(res, DATABASE_ERROR);
  }
}

async function login(req, res) {
  const {email, password} = req.body;

  if (!email || !password) {
    http.response(res, 'BAD_REQUEST', VALIDATION_ERROR);
    return;
  }

  try {
    const {user, token} = await authService.login(email, password);
    http.createAuthCookie(res, token);
    http.response(res, 'OK', null, null, user);
  } catch (err) {
    if (err.code === USER_NOT_FOUND) {
      http.response(res, 'NOT_FOUND', err.code);
      return;
    }
    if (err.code === INVALID_CREDENTIALS) {
      http.response(res, 'UNAUTHORIZED', err.code);
      return;
    }
    errors.serverError(res, DATABASE_ERROR);
  }
}

async function googleLogin(req, res) {
  const url = googleAdapter.getAuthUrl();
  res.redirect(url);
}

async function googleCallback(req, res) {
  const code = req.query?.code;
  const {googleId, email, emailVerified, username} =
    await googleAdapter.handleCallback(code);

  if (!googleId || !email || !username) {
    errors.serverError(res, ADAPTER_ERROR);
    return;
  }

  try {
    const {user, token} =
      await authService.loginWithGoogle(
        googleId,
        email,
        emailVerified,
        username
      );

    req.session.userId = user.id;
    http.createAuthCookie(res, token);
    res.redirect('/');
    return;
  } catch (err) {
    if (err.code === RESOURCE_CREATION_FAILED) {
      http.response(res, 'CONFLICT', err.code);
      return;
    }
  }

  errors.serverError(res, DATABASE_ERROR);
}

const authController = {
  register,
  login,
  googleLogin,
  googleCallback
};

export {authController};
