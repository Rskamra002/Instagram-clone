const express = require('express');
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

    // finding the users
    const isUserIdExist = await UsersData.findById(id).lean().exec();
    const isFollowUserIdExist = await UsersData.findById(value).lean().exec();

    // if user id does not exist or syntax is not correct then it will send error
    if (key !== 'follow' || !isUserIdExist || !isFollowUserIdExist) {
      return res.status(400).json({ error: 'Sorry! something went wrongdsaf' });
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

    // finding the users
    const isUserIdExist = await UsersData.findById(id).lean().exec();
    const isUnfollowUserIdExist = await UsersData.findById(value).lean().exec();

    // if user id does not exist or syntax is not correct then it will send error
    if (key !== 'unfollow' || !isUserIdExist || !isUnfollowUserIdExist) {
      return res.status(400).json({ error: 'Sorry! something went wrongdsaf' });
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

module.exports = router;
