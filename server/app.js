const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const cors = require('cors');

// this is a function in which i have to write the path of .env file in key:value pair
dotenv.config({ path: './.env' });
const connect = require('./db/connect');

const PORT = process.env.PORT;

// UserData Module
const UsersData = require('./model/userSchema');
const PostsData = require('./model/postSchema');
const StoryData = require('./model/storySchema');
const HastagData = require('./model/hashtagSchema');

//ChatData modules
const ConversationData = require('./model/conversationSchema');
const MessageData = require('./model/messageSchema');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(require('./router/auth'));
app.use(require('./router/users'));
app.use(require('./router/posts'));
app.use(require('./router/conversation'));
app.use(require('./router/message'));
app.use(require('./router/story'));
app.use(require('./router/hashtags'));
app.use(require('./router/notifications'));

async function start() {
  // Mongoose connection
  await connect();

  app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });
}
start();
