const express = require('express');
const UsersData = require('../model/userSchema');
const router = express.Router();

// get all notifications of a user
router.get('/notifications/:username', async (req, res) => {
  // this username can be username or id (username and id cannot be same because maximum length of username can be 16 and length of id will be more than 20 characters)
  try {
    const username = req.params.username;
    let user = await UsersData.findOne(
      { username: username },
      { isNewNotification: 1, notifications: 1, _id: 0 }
    )
      .lean()
      .exec();

    if (!user) {
      user = await UsersData.findOne(
        { _id: username },
        { isNewNotification: 1, notifications: 1, _id: 0 }
      )
        .lean()
        .exec();
    }

    res.status(200).json({ data: user });
  } catch (err) {
    res.status(400).json({ error: 'Sorry! something went wrong' });
    console.log(err);
  }
});

router.patch('/notifications/seen/:username', async (req, res) => {
  // this username can be username or id (username and id cannot be same because maximum length of username can be 16 and length of id will be more than 20 characters)
  try {
    const username = req.params.username;
    let user = await UsersData.findOneAndUpdate(
      { username: username },
      { $set: { isNewNotification: false } }
    )
      .lean()
      .exec();

    if (!user) {
      user = await UsersData.findOneAndUpdate(
        { _id: username },
        { $set: { isNewNotification: false } }
      )
        .lean()
        .exec();
    }

    res.status(200).json({ data: 'notifications seen successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Sorry! something went wrong' });
    console.log(err);
  }
});

module.exports = router;
