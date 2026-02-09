import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.js';
import commentRouter from './routes/comment.js';
import authJwt from './middlewares/authJwt.js';
import {errors} from '@secspace/shared';
const PORT = process.env.PORT;
const app = express();

const allowedOrigins = [
  'http://127.0.0.1'
];

app.use(cookieParser());
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (
      allowedOrigins.includes(origin) ||
      origin.endsWith('.trycloudflare.com')
    ) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {secure: false}
}));
app.use(express.json());
app.use('/auth', authRouter);
app.use('/comments', authJwt, commentRouter); 
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Running: ${PORT}`);
});
