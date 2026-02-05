import {commentService} from '../services/comment.js';
import {http} from '../utils/http.js';
import {errors} from '@secspace/shared';

const {
  RESOURCE_NOT_FOUND,
  RESOURCE_CREATION_FAILED,
  RESOURCE_UPDATE_FAILED,
  RESOURCE_DELETION_FAILED,
  DATABASE_ERROR,
  VALIDATION_ERROR,
} = errors.ErrorCodes;

async function list(req, res) {
  try {
    const comments = await commentService.listComments();
    return http.response(res, 'OK', null, null, comments);
  } catch (err) {
    if (err.code === RESOURCE_NOT_FOUND) {
      return http.response(res, 'NO_CONTENT');
    }
    return errors.serverError(res, DATABASE_ERROR);
  }
}

async function create(req, res) {
  const {content} = req.body;
  const userId = req.user?.id;

  if (!userId || !content) {
    return http.response(res, 'BAD_REQUEST', VALIDATION_ERROR);
  }

  try {
    const comment = await commentService.createComment(userId, content);
    return http.response(res, 'CREATED', null, null, comment);
  } catch (err) {
    if (err.code === RESOURCE_CREATION_FAILED) {
      return http.response(res, 'UNPROCESSABLE_ENTITY', err.code);
    }
    return errors.serverError(res, DATABASE_ERROR);
  }
}

async function update(req, res) {
  const commentId = req.params?.id;
  const userId = req.user?.id;
  const {content} = req.body;

  if (!commentId || !userId || !content) {
    return http.response(res, 'BAD_REQUEST', VALIDATION_ERROR);
  }

  try {
    const result = await commentService.updateComment(commentId, userId, content);
    return http.response(res, 'OK', null, null, result);
  } catch (err) {
    if (err.code === RESOURCE_UPDATE_FAILED) {
      return http.response(res, 'UNPROCESSABLE_ENTITY', err.code);
    }
    errors.serverError(res, DATABASE_ERROR);
  }
}

async function remove(req, res) {
  const commentId = req.params?.id;
  const userId = req.user?.id;

  if (!commentId || !userId) {
    return http.response(res, 'BAD_REQUEST', VALIDATION_ERROR);
  }

  try {
    await commentService.deleteComment(commentId, userId);
    return http.response(res, 'NO_CONTENT');
  } catch (err) {
    if (err.code === RESOURCE_DELETION_FAILED) {
      return http.response(res, 'UNPROCESSABLE_ENTITY', err.code);
    }
    return errors.serverError(res, DATABASE_ERROR);
  }
}

const commentController = {
  list,
  create,
  update,
  remove
};

export {commentController};
