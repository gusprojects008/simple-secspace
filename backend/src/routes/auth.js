import express from 'express';
import {authController} from '../controllers/auth.js';

const authRouter = express.Router();

authRouter.post('/login', authController.login);
authRouter.post('/register', authController.register);
authRouter.get('/login/:provider', authController.oauthLogin);
authRouter.get('/login/:provider/callback', authController.oauthCallback)

export default authRouter;
