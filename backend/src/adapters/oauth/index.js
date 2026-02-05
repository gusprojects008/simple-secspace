import * as google from './google.js';
import {errors} from '@secspace/shared';

const providers = {
  google
};

function getProvider(name) {
  const provider = providers[name];
  if (!provider) {
    error(errors.RESOURCE_NOT_SUPPORTED, `OAuth provider not supported: ${name}`);
  }
  return provider;
}

export {getProvider};
