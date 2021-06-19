const express = require('express');
const PostsData = require('../model/postSchema');
const HashtagData = require('../model/hashtagSchema');
const router = express.Router();

// to get all hashtags
router.get('/hashtags', async (req, res) => {
  try {
    const hashtags = await HashtagData.find({}).lean().exec();
    res.status(200).json({ data: hashtags });
  } catch (err) {
    res.status(400).json({ error: 'Sorry! something went wrong' });
    console.log(err);
  }
});

// to add hashtag
router.post('/addhashtag', async (req, res) => {
  try {
    const { hashtag } = req.body;
    if (hashtag === undefined) {
      return res.status(400).json({ error: 'Sorry! Invalid syntax' });
    }
    const hashtagAlreadyPresent = await HashtagData.findOne({
      hashtagName: hashtag,
    });
    if (hashtagAlreadyPresent) {
      return res.status(200).json({
        message: 'hashtag already present',
        data: hashtagAlreadyPresent,
      });
    }

    const newHashtag = new HashtagData({ hashtagName: hashtag });
    await newHashtag.save();
    res
      .status(200)
      .json({ message: 'hashtag successfully added', data: newHashtag });
  } catch (err) {
    res.status(400).json({ error: 'Sorry! something went wrong' });
    console.log(err);
  }
});

// to add posts related to hashtag
router.patch('/hashtag/addposts/:hashtag', async (req, res) => {
  try {
    const { hashtag } = req.params;
    const { postId } = req.body;

    if (hashtag === undefined || postId === undefined) {
      return res.status(400).json({ error: 'Sorry! Invalid syntax' });
    }

    const hashtagExist = await HashtagData.findOne({ hashtagName: hashtag });
    if (!hashtagExist) {
      return res.status(400).json({ message: 'hashtag does not exist' });
    }

    const isPostExist = await PostsData.findOne({ _id: postId });
    if (!isPostExist) {
      return res.status(400).json({ message: 'post does not exist' });
    }

    const hashtagInfo = await HashtagData.findOneAndUpdate(
      { hashtagName: hashtag },
      { $addToSet: { postIds: postId } },
      {
        new: true,
      }
    );
    res
      .status(200)
      .json({ message: 'postId added  successfully', data: hashtagInfo });
  } catch (err) {
    res.status(400).json({ error: 'Sorry! something went wrong' });
    console.log(err);
  }
});

// to get posts of related hashtag
router.get('/hashtag/posts/:hashtag', async (req, res) => {
  try {
    const { hashtag } = req.params;

    if (hashtag === undefined) {
      return res.status(400).json({ error: 'Sorry! Invalid syntax' });
    }

    const hashtagExist = await HashtagData.findOne({ hashtagName: hashtag });
    if (!hashtagExist) {
      return res.status(400).json({ message: 'hashtag does not exist' });
    }
    res
      .status(200)
      .json({ message: 'postId added  successfully', data: hashtagInfo });
  } catch (err) {
    res.status(400).json({ error: 'Sorry! something went wrong' });
    console.log(err);
  }
});

module.exports = router;
