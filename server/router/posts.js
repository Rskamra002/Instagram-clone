const express = require('express');
const PostsData = require('../model/postSchema');
const UsersData = require('../model/userSchema');
const HashtagData = require('../model/hashtagSchema');
const router = express.Router();

// get all posts
router.get('/posts', async (req, res) => {
  const page = +req.query._page;
  const limit = +req.query._limit;

  const offset = (page - 1) * limit;

  const posts = await PostsData.find({})
    .sort({ createdAt: 'desc' })
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

// get all posts of a user

router.get('/posts/user/:id', async (req, res) => {
  // id => userId
  try {
    const userId = req.params.id;
    const posts = await PostsData.find({ userId: userId })
      .sort({ createdAt: 'desc' })
      .lean()
      .exec();
    res.status(200).json({ data: posts });
  } catch (err) {
    res.status(400).json({ error: 'Sorry! something went wrong' });
    console.log(err);
  }
});

// get posts of those users whom you are following
// router.get('/posts/followers/:id', async (req, res) => {
//   const id = req.params.id;
//   const page = +req.query._page;
//   const limit = +req.query._limit;

//   const users = await UsersData.findById(id).lean().exec();
//   const { following } = users;
//   const allPosts = [];

//   following.forEach(async (user) => {
//     const posts = PostsData.find({ userId: user })
//       .sort({ createdAt: 'desc' })
//       .lean()
//       .exec();
//     allPosts.push(posts);
//   });
//   // slice.((page-1)*limit,page*limit)
//   Promise.all(allPosts).then((data) => {
//     res.status(200).json({ data: data });
//   });
// });

// adding new post
router.post('/posts/addpost', async (req, res) => {
  const { src, userId ,caption} = req.body;

  if (!src || !userId) {
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

    let hashTags = "";
    if (caption !== undefined) {
      const captionArr = caption.trim().split(' ');
      for (let i = 0; i < captionArr.length; i++) {
        if (captionArr[i][0] === '#') {
          hashTags=captionArr[i];
        }
      }
    }
    if(hashTags !== undefined){
      const hashtagAlreadyPresent = await HashtagData.findOne({
        hashtagName: hashTags,
      });
      if (hashtagAlreadyPresent) {
        await HashtagData.findOneAndUpdate(
          { hashtagName: hashTags },
          { $addToSet: { postIds: newPost._id } },
          {
            new: true,
          }
        );
      }
      if (!hashtagAlreadyPresent){

        const newHashtag = new HashtagData({ hashtagName: hashTags});
        await newHashtag.save();
        await HashtagData.findOneAndUpdate(
          { hashtagName: hashTags },
          { $addToSet: { postIds: newPost._id } },
          {
            new: true,
          }
        );
      }
    }
    // console.log(newPost._id)

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

    const { userId } = req.body;

    // finding user in our DB
    const isUserExist = await UsersData.findById(userId).lean().exec();
    // finding post in our DB
    const isPostExist = await PostsData.findById(id).lean().exec();

    // if user and post id's does not exist in our DB or syntax is not correct then it will send error
    if (!userId) {
      return res.status(400).json({ error: 'Sorry! Invalid syntax' });
    } else if (!isUserExist) {
      return res.status(400).json({ error: 'Sorry! This user does not exist' });
    } else if (!isPostExist) {
      return res.status(400).json({ error: 'Sorry! This post does not exist' });
    }

    // adding userId in likes array (user who is going to like that post)
    const post = await PostsData.findOneAndUpdate(
      { _id: id },
      { $addToSet: { likes: userId } },
      {
        new: true,
      }
    );

    // logic for notification part
    const postByUserId = post.userId;

    const likedBy = await UsersData.findOne(
      { _id: userId },
      { password: 0, tokens: 0 }
    )
      .lean()
      .exec();

    await UsersData.findOneAndUpdate(
      { _id: postByUserId },
      {
        $addToSet: {
          notifications: {
            notification: `${likedBy.username} liked your post`,
            fromUserSrc: isUserExist.profilePic,
            postSrc: post.src,
            timestamp: Date.now(),
          },
        },
      },
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

    const { userId } = req.body;

    // finding user in our DB
    const isUserExist = await UsersData.findById(userId).lean().exec();
    // finding post in our DB
    const isPostExist = await PostsData.findById(id).lean().exec();

    // if user and post id's does not exist in our DB or syntax is not correct then it will send error
    if (!userId) {
      return res.status(400).json({ error: 'Sorry! Invalid syntax' });
    } else if (!isUserExist) {
      return res.status(400).json({ error: 'Sorry! This user does not exist' });
    } else if (!isPostExist) {
      return res.status(400).json({ error: 'Sorry! This post does not exist' });
    }

    // removing userId from likes array (user who is going to unlike that post)
    const post = await PostsData.findOneAndUpdate(
      { _id: id },
      { $pull: { likes: userId } },
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

// patch request to add comment
router.patch('/posts/addcomment/:id', async (req, res) => {
  try {
    // id => postid
    const id = req.params.id;

    const body = req.body;
    const { userId, comment } = body;

    // finding user in our DB
    const isUserExist = await UsersData.findById(userId).lean().exec();
    // finding post in our DB
    const isPostExist = await PostsData.findById(id).lean().exec();

    // if user and post id's does not exist in our DB or syntax is not correct then it will send error
    if (!userId || !comment) {
      return res.status(400).json({ error: 'Sorry! Invalid syntax' });
    } else if (!isUserExist) {
      return res.status(400).json({ error: 'Sorry! This user does not exist' });
    } else if (!isPostExist) {
      return res.status(400).json({ error: 'Sorry! This post does not exist' });
    }

    // adding userId in likes array (user who is going to like that post)
    const post = await PostsData.findOneAndUpdate(
      { _id: id },
      { $addToSet: { comments: { ...body, commentTime: Date.now() } } },
      {
        new: true,
      }
    );

    // logic for notification part
    const postByUserId = post.userId;

    const commentedBy = await UsersData.findOne(
      { _id: userId },
      { password: 0, tokens: 0 }
    )
      .lean()
      .exec();

    await UsersData.findOneAndUpdate(
      { _id: postByUserId },
      {
        $addToSet: {
          notifications: {
            notification: `${commentedBy.username} commented on your post`,
            fromUserSrc: isUserExist.profilePic,
            postSrc: post.src,
            timestamp: Date.now(),
          },
        },
      },
      {
        new: true,
      }
    );

    res.status(200).json({ message: 'Comment added successfully', data: post });
  } catch (err) {
    res.status(400).json({ error: 'Sorry! something went wrong' });
    console.log(err);
  }
});

// patch request to like comment
router.patch('/posts/likecomment/:id', async (req, res) => {
  try {
    // id => postid
    const id = req.params.id;

    const { userId, commentId } = req.body;

    // finding user in our DB
    const isUserExist = await UsersData.findById(userId).lean().exec();
    // finding post in our DB
    const isPostExist = await PostsData.findById(id).lean().exec();

    // if user and post id's does not exist in our DB or syntax is not correct then it will send error
    if (!userId || !commentId) {
      return res.status(400).json({ error: 'Sorry! Invalid syntax' });
    } else if (!isUserExist) {
      return res.status(400).json({ error: 'Sorry! This user does not exist' });
    } else if (!isPostExist) {
      return res.status(400).json({ error: 'Sorry! This post does not exist' });
    }

    // implementing brute force

    // adding userId in likes array (user who is going to like that comment)
    const post = await PostsData.findOne({
      comments: { $elemMatch: { _id: commentId } },
    })
      .lean()
      .exec();
    const comments = post.comments;
    for (let i = 0; i < comments.length; i++) {
      if (comments[i]._id.toString() === commentId) {
        // if userId is already present inside likes array we will not push it
        if (!comments[i].likes.includes(userId)) {
          comments[i].likes.push(userId);
        }
      }
    }

    // logic for notification part
    const postByUserId = post.userId;

    const commentedLikeBy = await UsersData.findOne(
      { _id: userId },
      { password: 0, tokens: 0 }
    )
      .lean()
      .exec();

    await UsersData.findOneAndUpdate(
      { _id: postByUserId },
      {
        $addToSet: {
          notifications: {
            notification: `${commentedLikeBy.username} liked your comment`,
            fromUserSrc: isUserExist.profilePic,
            postSrc: post.src,
            timestamp: Date.now(),
          },
        },
      },
      {
        new: true,
      }
    );

    await PostsData.updateOne({ _id: id }, { $set: { comments: comments } });

    res.status(200).json({ message: 'Comment like successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Sorry! something went wrong' });
    console.log(err);
  }
});

// patch request to unlike comment
router.patch('/posts/unlikecomment/:id', async (req, res) => {
  try {
    // id => postid
    const id = req.params.id;

    const { userId, commentId } = req.body;

    // finding user in our DB
    const isUserExist = await UsersData.findById(userId).lean().exec();
    // finding post in our DB
    const isPostExist = await PostsData.findById(id).lean().exec();

    // if user and post id's does not exist in our DB or syntax is not correct then it will send error
    if (!userId || !commentId) {
      return res.status(400).json({ error: 'Sorry! Invalid syntax' });
    } else if (!isUserExist) {
      return res.status(400).json({ error: 'Sorry! This user does not exist' });
    } else if (!isPostExist) {
      return res.status(400).json({ error: 'Sorry! This post does not exist' });
    }
    // implementing brute force

    // removing userId in likes array (user who is going to unlike that comment)
    const post = await PostsData.findOne({
      comments: { $elemMatch: { _id: commentId } },
    })
      .lean()
      .exec();
    const comments = post.comments;
    for (let i = 0; i < comments.length; i++) {
      if (comments[i]._id.toString() === commentId) {
        // if userId is already present inside likes array we will remove it
        for (let j = 0; j < comments[i].likes.length; j++) {
          if (comments[i].likes[j].toString() == userId) {
            comments[i].likes.splice(j, 1);
            console.log('hello');
          }
        }
      }
    }

    await PostsData.updateOne({ _id: id }, { $set: { comments: comments } });

    res
      .status(200)
      .json({ message: 'Comment unlike successfully', data: comments });
  } catch (err) {
    res.status(400).json({ error: 'Sorry! something went wrong' });
    console.log(err);
  }
});

module.exports = router;

// router.get('/xyz', async (req, res) => {
//   await UsersData.updateMany({}, { $set: { notifications: [] } });
//   res.status(200).json({ message: 'uccessful' });
// });
