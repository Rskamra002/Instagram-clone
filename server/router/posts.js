const express = require('express');
const PostsData = require('../model/postSchema');
const UsersData = require('../model/userSchema');
const router = express.Router();

// get all posts
router.get('/posts', async (req, res) => {
  const page = +req.query._page;
  const limit = +req.query._limit;

  const offset = page - 1 + limit;

  const posts = await PostsData.find({})
    .skip(offset)
    .limit(limit)
    .lean()
    .exec();

  res.status(200).json({ data: posts });
});

// get particular post
router.get('/posts/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const post = await PostsData.findOne({ _id: id }).lean().exec();
    res.status(200).json({ data: post });
  } catch (err) {
    res.status(400).json({ error: 'Sorry! something went wrong' });
    console.log(err);
  }
});

// adding new post
router.post('/posts/addpost', async (req, res) => {
  const { imgSrc, userId } = req.body;

  if (!imgSrc || !userId) {
    return res
      .status(422)
      .json({ error: 'Please submit all the fields properly' });
  }

  try {
    const isUserExist = await UsersData.findOne({ _id: userId });

    if (!isUserExist) {
      return res.status(422).json({ error: "Sorry! User doesn't exist" });
    }

    const newPost = new PostsData(req.body);
    await newPost.save();

    if (newPost) {
      res.status(201).json({ message: 'Post added successfully' });
    } else {
      res.status(500).json({ error: 'Failed to add new post' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Sorry! something went wrong' });
  }
});

// patch request to like the post
router.patch('/posts/likepost/:id', async (req, res) => {
  try {
    // id => postid
    const id = req.params.id;
    const body = req.body;
    const [key] = Object.keys(body);
    // value => userid
    const [value] = Object.values(body);

    // finding user in our DB
    const isUserExist = await UsersData.findById(value).lean().exec();
    // finding post in our DB
    const isPostExist = await PostsData.findById(id).lean().exec();

    // if user and post id's does not exist in our DB or syntax is not correct then it will send error
    if (key !== 'likeBy') {
      return res.status(400).json({ error: 'Sorry! Invalid syntax' });
    } else if (!isUserExist) {
      return res.status(400).json({ error: 'Sorry! This user does not exist' });
    } else if (!isPostExist) {
      return res.status(400).json({ error: 'Sorry! This post does not exist' });
    }

    // adding userId in likes array (user who is going to like that post)
    const post = await PostsData.findOneAndUpdate(
      { _id: id },
      { $addToSet: { likes: value } },
      {
        new: true,
      }
    );
    res.status(200).json({ message: 'Liked post successfully', data: post });
  } catch (err) {
    res.status(400).json({ error: 'Sorry! something went wrong' });
    console.log(err);
  }
});

// patch request to unlike the post
router.patch('/posts/unlikepost/:id', async (req, res) => {
  try {
    // id => postid
    const id = req.params.id;
    const body = req.body;
    const [key] = Object.keys(body);
    // value => userid
    const [value] = Object.values(body);

    // finding user in our DB
    const isUserExist = await UsersData.findById(value).lean().exec();
    // finding post in our DB
    const isPostExist = await PostsData.findById(id).lean().exec();

    // if user and post id's does not exist in our DB or syntax is not correct then it will send error
    if (key !== 'unlikeBy') {
      return res.status(400).json({ error: 'Sorry! Invalid syntax' });
    } else if (!isUserExist) {
      return res.status(400).json({ error: 'Sorry! This user does not exist' });
    } else if (!isPostExist) {
      return res.status(400).json({ error: 'Sorry! This post does not exist' });
    }

    // removing userId from likes array (user who is going to unlike that post)
    const post = await PostsData.findOneAndUpdate(
      { _id: id },
      { $pull: { likes: value } },
      {
        new: true,
      }
    );
    res.status(200).json({ message: 'Unliked post successfully', data: post });
  } catch (err) {
    res.status(400).json({ error: 'Sorry! something went wrong' });
    console.log(err);
  }
});

module.exports = router;
