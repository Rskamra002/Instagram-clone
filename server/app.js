const express = require('express');
const mongoose = require('mongoose');
const connect = require('./db/connect');
const dotenv = require('dotenv');
// this is a function in which i have to write path of .env file in key:value pair
dotenv.config({ path: './.env' });

const PORT = process.env.PORT;

// UserData Module
const UsersData = require('./model/userSchema');
const PostsData = require('./model/postSchema');

const app = express();

// Middlewares
app.use(express.json());

app.use(require('./router/auth'));
app.use(require('./router/user'));

async function start() {
  // Mongoose connection
  await connect();

  app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });
}
start();