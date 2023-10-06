import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from "cookie-parser";
import multer from 'multer';
import { router as authRouter } from './routes/auth.js';
import { router as userRouter } from './routes/users.js';
import { router as postRouter } from './routes/posts.js';

const PORT = 5000;
const app = express();
dotenv.config();

app.use(cors())
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded());

mongoose
  .connect("mongodb+srv://anastasia:nWdeF6tbMpiP8wX@blog.jtaybjo.mongodb.net/blog?retryWrites=true&w=majority")
  .then(console.log('Connected to database'))
  .catch((err) => console.log('DB error', err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/images');
  }, 
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }, 
});
const upload = multer({ storage });

app.post('/api/upload', upload.single('image'), (req, res) => {
  res.status(200).json({
    url: `/images/${req.file.originalname}`
  });
});

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
