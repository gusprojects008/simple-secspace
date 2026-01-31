import express from 'express';
import {commentController} from '../controllers/comment.js';

const commentRouter = express.Router();

commentRouter.get('/', commentController.list);
commentRouter.post('/', commentController.create);
commentRouter.put('/:id', commentController.update);
commentRouter.delete('/:id', commentController.remove);

export default commentRouter;
