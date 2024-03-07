import { Router } from 'express';
import { PostModel } from '../models/Post.js';
import { UserModel } from '../models/User.js';

export const router = Router();

router.get('/tags', async (req, res) => {
  try {
    const posts = await PostModel.find()

    const tags = posts
      .map((obj) => obj.tags)
      .flat()
      
    const result = [...new Map(tags.map(item => 
      [item['label'], item])).values()]

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      message: 'Could not get tags',
    });
  }
});

router.get('/popular', async (req, res) => {
  try {
    const popularPosts = await PostModel
    .find()
    .limit(3)
    .sort('-viewsCount')

    res.status(200).json(popularPosts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const posts = await PostModel
    .find()
    .sort({ createdAt: "desc" });

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    const userPost = await UserModel.findOne({ _id: post.userId });

    await PostModel.findOneAndUpdate(
      {
        _id: post._id,
      },
      {
        $inc: { viewsCount: 1 },
      }
    );

    const response = {
      post,
      userPost,
    };

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newPost = new PostModel(req.body);
    const post = await newPost.save();

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedPost = await PostModel.findByIdAndUpdate(
      req.params.id, 
      {
        $set: req.body,
      }, 
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await PostModel.findByIdAndDelete(req.params.id);
    res.status(200).json('Post has been deleted');
  } catch (err) {
    res.status(500).json(err);
  }
});
