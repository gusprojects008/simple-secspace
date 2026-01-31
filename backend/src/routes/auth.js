import express from 'express';
import {authController} from '../controllers/auth.js';

const authRouter = express.Router();

authRouter.post('/login', authController.login);
authRouter.post('/register', authController.register);
authRouter.get('/login/google', authController.googleLogin);
authRouter.get('/login/google/callback', authController.googleCallback)

export default authRouter;
