import {commentRepository} from '../repositories/comment.js';
import {errors} from '../utils/errors.js';

const {
  RESOURCE_NOT_FOUND,
  RESOURCE_CREATION_FAILED,
  RESOURCE_UPDATE_FAILED,
  RESOURCE_DELETION_FAILED
} = errors.ErrorCodes;

async function listComments() {
  const comments = await commentRepository.list();
  if (!comments) {
    errors.error(RESOURCE_NOT_FOUND);
  }
  return comments;
}

async function createComment(userId, content) {
  const result = await commentRepository.create(userId, content);
  if (!result) {
    errors.error(RESOURCE_CREATION_FAILED);
  }
  return result;
}

async function updateComment(commentId, userId, content) {
  const result = await commentRepository.update(commentId, userId, content);
  if (!result) {
    errors.error(RESOURCE_UPDATE_FAILED);
  }
  return result;
}

async function removeComment(commentId, userId) {
  const result = await commentRepository.remove(commentId, userId);
  if (!result) {
    errors.error(RESOURCE_DELETION_FAILED);
  }
  return result;
}

const commentService = {
  listComments,
  createComment,
  updateComment,
  removeComment
};

export {commentService};
