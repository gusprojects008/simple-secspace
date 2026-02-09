import db from "../adapters/db.js";

async function create(userId, provider, providerUserId, verifiedEmail) {
  const result = await db.query(
    `
    INSERT INTO auth_providers (
      user_id,
      provider,
      provider_user_id,
      verified_email
    )
    VALUES ($1, $2, $3, $4)
    RETURNING user_id, provider_user_id, verified_email
    `,
    [userId, provider, providerUserId, verifiedEmail]
  );

  return result.rows[0];
}

async function markEmailAsVerified(provider, providerUserId, verifiedEmail) {
  if (!verifiedEmail) return;

  const {rows} = await db.query(
    `
    UPDATE auth_providers
    SET verified_email = true,
        updated_at = NOW()
    WHERE provider = $1
      AND provider_user_id = $2
    RETURNING id, verified_email, updated_at
    `,
    [provider, providerUserId]
  );
  return rows[0];
}

async function findByProviderUserId(provider, providerUserId) {
  const {rows} = await db.query(
    `
    SELECT user_id, provider, provider_user_id
    FROM auth_providers
    WHERE provider = $1
      AND provider_user_id = $2
    `,
    [provider, providerUserId]
  );

  return rows[0];
}

async function updateUserId(provider, providerUserId, userId) {
  const {rows} = await db.query(
    `
     UPDATE auth_providers
     SET user_id = $3,
       updated_at = NOW()
     WHERE provider = $1 AND provider_user_id = $2
     RETURNING user_id, provider_user_id
     `,
     [provider, providerUserId, userId]
  );
  return rows[0];
}

const authProviderRepository = {
  create,
  markEmailAsVerified,
  findByProviderUserId,
  updateUserId
};

export {authProviderRepository};
