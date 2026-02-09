import express from 'express';
import {authController} from '../controllers/auth.js';
import authJwt from '../middlewares/authJwt.js';

const authRouter = express.Router();

authRouter.post('/login', authController.login);
authRouter.post('/register', authController.register);
authRouter.get('/login/:provider', authController.oauthLogin);
authRouter.get('/login/:provider/callback', authController.oauthCallback)
authRouter.get('/me', authJwt, authController.me);

export default authRouter;
