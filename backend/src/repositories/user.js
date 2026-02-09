import db from '../adapters/db.js';

async function create(username, email, passwordHash) {
  const query = 'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email';
  const values = [username, email, passwordHash];
  const result = await db.query(query, values); // You could use {rows} to get the result
  return result.rows[0]; // rows: [{id: 1, username: "example"}, {email: example@example.com}] The "insert" statement can return multiple rows, so for safety, let's specify that we want exactly the first row of the array. The values for each row of the "users" table are in a "{}" object
};

async function findByEmail(email) {
  const {rows} = await db.query('SELECT id, username, email, password_hash FROM users WHERE email = $1', [email]);
  return rows[0];
};

async function findById(userId) {
  const {rows} = await db.query('SELECT id, username, email, password_hash FROM users WHERE id = $1', [userId]);
  return rows[0];
};

const userRepository = {
  create,
  findByEmail,
  findById
}

export {userRepository};
