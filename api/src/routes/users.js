import { Router } from 'express';
import { UserModel } from '../models/User.js';
import { PostModel } from '../models/Post.js';

export const router = Router();

router.get('/:id', async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    const userPosts = await PostModel.find({ userId: user._id });

    const response = {
      userPosts,
      user,
    };

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id, 
      {
        $set: req.body,
      }, 
      { new: true }
    );  

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  const user = await UserModel.findById(req.params.id);

  try {
    await PostModel.deleteMany({ userId: req.params.id })
    await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).json('User has been deleted');
  } catch (err) {
    res.status(500).json(err);
  }
});
