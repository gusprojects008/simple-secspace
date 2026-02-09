import {userRepository} from '../repositories/user.js';
import {authProviderRepository} from '../repositories/authProvider.js';
import {security} from '../utils/security.js';
import {errors} from '@secspace/shared';

const {
  RESOURCE_ALREADY_EXISTS,
  RESOURCE_NOT_FOUND,
  RESOURCE_INVALID,
  INVALID_CREDENTIALS
} = errors.ErrorCodes;

const {error} = errors; 

const {hashPassword, verifyPassword, generateToken} = security;

async function register(username, email, password) {
  const userExists = await userRepository.findByEmail(email);
  if (userExists) {
    error(RESOURCE_ALREADY_EXISTS);
  }
  const passwordHash = await hashPassword(password);
  const result = await userRepository.create(username, email, passwordHash);
  return result;
}

async function login(email, password) {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    error(RESOURCE_NOT_FOUND);
  }

  const valid = await verifyPassword(password, user.password_hash);
  if (!valid) {
    error(INVALID_CREDENTIALS);
  }

  const token = await generateToken(user);
  return {user, token};
}

async function loginWithProvider({
  provider,
  providerUserId,
  email,
  verifiedEmail,
  username
}) {
  console.log({
    provider,
    providerUserId,
    email,
    verifiedEmail,
    username
  });

  const existingProvider = await authProviderRepository.findByProviderUserId(
    provider,
    providerUserId
  );

  if (existingProvider) {
    if (verifiedEmail && !existingProvider.verified_email) {
      await authProviderRepository.markEmailAsVerified(
        provider,
        providerUserId,
        true
      );
    }

    let user = await userRepository.findById(existingProvider.user_id);

    if (!user) {
      user = await userRepository.findByEmail(email);
      if (!user) {
        user = await userRepository.create(username, email, null);
      };
      await authProviderRepository.updateUserId(provider, providerUserId, user.id);
    };

    const token = await generateToken(user);
    return {user, token};
  }

  let user = await userRepository.findByEmail(email);

  if (!user) {
    user = await userRepository.create(
      username,
      email,
      null
    );
  }

  await authProviderRepository.create(
    user.id,
    provider,
    providerUserId,
    verifiedEmail
  );

  const token = await generateToken(user);
  return {user, token};
}

const authService = {
  register,
  login,
  loginWithProvider
};

export {authService};
