const express = require('express');
const router = express.Router();
const Message = require("../model/messageSchema");

//add

router.post("/message", async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get

router.get("/message/:conversationId", async (req, res) => {
  let conversationId = req.params.conversationId.toString()
  try {
    const messages = await Message.find({
      conversationId: conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;