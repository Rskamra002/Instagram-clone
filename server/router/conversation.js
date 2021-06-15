const express = require('express');
const router = express.Router();
const Conversation = require("../model/conversationSchema");

//new conv

router.post("/newConversation", async (req, res) => {
  const connectionAlreadyExists = await Conversation.findOne({members:{$all:[req.body.senderId,req.body.receiverId]}})
  if(connectionAlreadyExists){
   return res.status(200).json(connectionAlreadyExists);
  }

  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get conv of a user

router.get("/conversation/:userId", async (req, res) => {
  let id =req.params.userId.toString()
  try {
    const conversation = await Conversation.find({members: {$in:[id]}}).sort({ createdAt: 'desc'}).exec();
    res.status(200).json({data:conversation});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;