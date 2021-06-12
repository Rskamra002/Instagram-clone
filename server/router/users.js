const express = require('express');
const PostsData = require('../model/postSchema');
const UsersData = require('../model/userSchema');
const router = express.Router();

// get all user
router.get('/users', async (req, res) => {
  const page = +req.query._page;
  const limit = +req.query._limit;

  const offset = page - 1 + limit;

  const users = await UsersData.find({}, { password: 0, tokens: 0 })
    .skip(offset)
    .limit(limit)
    .lean()
    .exec();

  res.status(200).json({ data: users });
});

// get particular user
router.get('/users/:username', async (req, res) => {
  try {
    const username = req.params.username;
    const user = await UsersData.findOne(
      { username: username },
      { password: 0, tokens: 0 }
    )
      .lean()
      .exec();
    res.status(200).json({ data: user });
  } catch (err) {
    res.status(400).json({ error: 'Sorry! something went wrong' });
    console.log(err);
  }
});

// patch request to follow someone
router.patch('/users/follow/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const [key] = Object.keys(body);
    const [value] = Object.values(body);

    // finding users in our DB
    const isUserIdExist = await UsersData.findById(id).lean().exec();
    const isFollowUserIdExist = await UsersData.findById(value).lean().exec();

    // if user id's does not exist in our DB or syntax is not correct then it will send error
    if (key !== 'follow') {
      return res.status(400).json({ error: 'Sorry! Invalid syntax' });
    } else if (!isUserIdExist) {
      return res.status(400).json({ error: 'Sorry! This user does not exist' });
    } else if (!isFollowUserIdExist) {
      return res
        .status(400)
        .json({ error: 'Sorry! This follow user does not exist' });
    }

    // adding in following array (user who is going to follow someone)
    const user = await UsersData.findOneAndUpdate(
      { _id: id },
      { $addToSet: { following: value } },
      {
        new: true,
      }
    );

    // adding in follower array (user who is followed by someone)
    await UsersData.findOneAndUpdate(
      { _id: value },
      { $addToSet: { followers: id } }
    );
    res.status(200).json({ data: user });
  } catch (err) {
    res.status(400).json({ error: 'Sorry! something went wrong' });
    console.log(err);
  }
});

// patch request for removing following and followers
router.patch('/users/unfollow/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const [key] = Object.keys(body);
    const [value] = Object.values(body);

    // finding users in our DB
    const isUserIdExist = await UsersData.findById(id).lean().exec();
    const isUnfollowUserIdExist = await UsersData.findById(value).lean().exec();

    // if user id's does not exist in our DB or syntax is not correct then it will send error
    if (key !== 'unfollow') {
      return res.status(400).json({ error: 'Sorry! Invalid syntax' });
    } else if (!isUserIdExist) {
      return res.status(400).json({ error: 'Sorry! This user does not exist' });
    } else if (!isUnfollowUserIdExist) {
      return res
        .status(400)
        .json({ error: 'Sorry! This unfollow user does not exist' });
    }

    const user = await UsersData.findOneAndUpdate(
      { _id: id },
      { $pull: { following: value } },
      {
        new: true,
      }
    );

    await UsersData.findOneAndUpdate(
      { _id: value },
      { $pull: { followers: id } }
    );

    res.status(202).json({ data: user });
  } catch (err) {
    res.status(400).json({ error: 'Sorry! something went wrong' });
    console.log(err);
  }
});

// patch request for adding posts in savedPost
router.patch('/users/savepost/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const [key] = Object.keys(body);
    const [value] = Object.values(body);

    // finding user and post in our DB
    const isUserIdExist = await UsersData.findById(id).lean().exec();
    const isPostIdExist = await PostsData.findById(value).lean().exec();

    // if user id or post id does not exist in our DB or syntax is not correct then it will send error
    if (key !== 'savepost') {
      return res.status(400).json({ error: 'Sorry! Invalid syntax' });
    } else if (!isUserIdExist) {
      return res.status(400).json({ error: 'Sorry! This user does not exist' });
    } else if (!isPostIdExist) {
      return res.status(400).json({ error: 'Sorry! This post does not exist' });
    }

    const user = await UsersData.findOneAndUpdate(
      { _id: id },
      { $addToSet: { savedPosts: value } },
      {
        new: true,
      }
    );
    res.status(200).json({ data: user });
  } catch (err) {
    res.status(400).json({ error: 'Sorry! something went wrong' });
    console.log(err);
  }
});

// patch request for removing posts from savedPost
router.patch('/users/removesavedpost/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const [key] = Object.keys(body);
    const [value] = Object.values(body);

    // finding user and post in our DB
    const isUserIdExist = await UsersData.findById(id).lean().exec();
    const isPostIdExist = await PostsData.findById(value).lean().exec();

    // if user id or post id does not exist in our DB or syntax is not correct then it will send error
    if (key !== 'removesavedpost') {
      return res.status(400).json({ error: 'Sorry! Invalid syntax' });
    } else if (!isUserIdExist) {
      return res.status(400).json({ error: 'Sorry! This user does not exist' });
    } else if (!isPostIdExist) {
      return res.status(400).json({ error: 'Sorry! This post does not exist' });
    }

    const user = await UsersData.findOneAndUpdate(
      { _id: id },
      { $pull: { savedPosts: value } },
      {
        new: true,
      }
    );
    res.status(200).json({ data: user });
  } catch (err) {
    res.status(400).json({ error: 'Sorry! something went wrong' });
    console.log(err);
  }
});

module.exports = router;
