const express = require('express');
const StoryData = require('../model/storySchema');
const UsersData = require('../model/userSchema');
const router = express.Router();


router.get('/story', async (req, res) => {
    const story = await StoryData.find({})
      .lean()
      .exec();
  
    res.status(200).json({ data: story });
});

router.post('/story/addstory', async (req, res) => {
    const { img,  userName, userProfile } = req.body;
  
    // if (!img || !userName) {
    //   return res
    //     .status(422)
    //     .json({ error: 'Please submit all the fields properly' });
    // }
  
    try {
    //   const isUserExist = await UsersData.findOne({ _id: userId });
  
    //   if (!isUserExist) {
    //     return res.status(422).json({ error: "Sorry! User doesn't exist" });
    //   }
  
      const newStory = new StoryData(req.body);
      await newStory.save();
  
      if (newStory) {
        res.status(201).json({ message: 'Story added successfully' });
      } else {
        res.status(500).json({ error: 'Failed to add new post' });
      }
    } catch (err) {
      console.log(err);
      res.status(404).json({ error: 'Sorry! something went wrong' });
    }
  });


  router.patch('/story/:id', async (req, res) => {
    try {
    const id = req.params.id;
    const { userId } = req.body;
    const story = await StoryData.findOneAndUpdate(
        { _id: id },
        { $addToSet: { view: userId } },
        {
          new: true,
        }
      );
      res.status(200).json({ message: 'Changed viewer successfully', data: story });

      
    } catch (err) {
      res.status(400).json({ error: 'Sorry! something went wrong' });
    }
  });

module.exports = router;

  