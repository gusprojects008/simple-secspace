import db from '../adapters/db.js';

async function list() {
  const result = await db.query(
    'SELECT c.id, c.content, c.created_at, u.username FROM comments c JOIN users u ON u.id = c.user_id ORDER BY c.created_at ASC'
  );
  return result.rows;
}

async function create(userId, content) {
  const result = await db.query(
    'INSERT INTO comments (user_id, content) VALUES ($1, $2) RETURNING id, content, user_id, created_at',
    [userId, content]
  );
  return result.rows[0];
}

async function update(commentId, userId, content) {
  const result = await db.query(
    'UPDATE comments SET content = $3 WHERE id = $1 AND user_id = $2 RETURNING id, content',
    [commentId, userId, content]
  );
  return result.rows[0];
}

async function remove(commentId, userId) {
  const result = await db.query(
    'DELETE FROM comments WHERE id = $1 AND user_id = $2',
    [commentId, userId]
  );
  return result.rowCount;
}

const commentRepository = {
  list,
  create,
  update,
  remove
};

export {commentRepository};
