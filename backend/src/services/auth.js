import {userRepository} from '../repositories/user.js';
import {errors} from '../utils/errors.js';
import {security} from '../utils/security.js';

const {
  RESOURCE_ALREADY_EXISTS,
  RESOURCE_NOT_FOUND,
  INVALID_CREDENTIALS
} = errors.ErrorCodes;

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

  const token = generateToken(user);
  return {user, token};
}

async function loginWithProvider({
  provider,
  providerUserId,
  email,
  emailVerified,
  username
}) {
  const existingProvider =
    await authProviderRepository.findByProviderUserId(
      provider,
      providerUserId
    );

  if (existingProvider) {
    if (emailVerified && !existingProvider.email_verified) {
      await authProviderRepository.markEmailAsVerified(
        provider,
        providerUserId,
        true
      );
    }

    const user = await userRepository.findById(existingProvider.user_id);
    const token = generateToken(user);
    return { user, token };
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
    emailVerified
  );

  const token = generateToken(user);
  return { user, token };
}

const authService = {
  register,
  login,
  loginWithProvider
};

export {authService};
