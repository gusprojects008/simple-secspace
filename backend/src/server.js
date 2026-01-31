import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import authRouter from './routes/auth.js';
import commentRouter from './routes/comment.js';
import authJwt from './middlewares/authJwt.js';
const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUnintialized: false,
  cookie: {secure: false}
}));
app.use(express.json());
app.use('/auth', authRouter);
app.use('/comments', authJwt, commentRouter); 
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Running: ${PORT}`);
});
