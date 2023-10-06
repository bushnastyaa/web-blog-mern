import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/User.js';

export const router = Router();

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
  
    const hashedPass = await bcrypt.hash(password, 12);

    const newUser = new UserModel({ username, email, password: hashedPass });
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET);
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      res.status(400).json('Wrong email or password');
    }
  
    const validatedPass = await bcrypt.compare(password, user.password);

    if (!validatedPass) {
      res.status(400).json('Wrong email or password');
    }
    
    const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET);
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
