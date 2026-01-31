import db from "../adapters/db.js";

async function findByProviderUserId(provider, providerUserId) {
  const result = await db.query(
    `
    SELECT *
    FROM auth_providers
    WHERE provider = $1
      AND provider_user_id = $2
    `,
    [provider, providerUserId]
  );

  return result;
}

async function markEmailAsVerified(provider, providerUserId, emailVerified) {
  if (!emailVerified) return;

  await db.query(
    `
    UPDATE auth_providers
    SET email_verified = true,
        updated_at = NOW()
    WHERE provider = $1
      AND provider_user_id = $2
    `,
    [provider, providerUserId]
  );
}

async function create(userId, provider, providerUserId, emailVerified) {
  const result = await db.query(
    `
    INSERT INTO auth_providers (
      user_id,
      provider,
      provider_user_id,
      email_verified
    )
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
    [userId, provider, providerUserId, emailVerified]
  );

  return result.rows[0];
}

const authProviderRepository = {
  findByProviderUserId,
  markEmailAsVerified,
  create
};

export {authProviderRepository};

