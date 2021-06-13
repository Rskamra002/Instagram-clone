const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require("cors")

// this is a function in which i have to write the path of .env file in key:value pair
dotenv.config({ path: './.env' });
const connect = require('./db/connect');

const PORT = process.env.PORT;

// UserData Module
const UsersData = require('./model/userSchema');
const PostsData = require('./model/postSchema');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors())
app.use(require('./router/auth'));
app.use(require('./router/users'));
app.use(require('./router/posts'));

async function start() {
  // Mongoose connection
  await connect();

  app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });
}
start();
