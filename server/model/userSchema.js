const mongoose = require('mongoose');

const reqString = {
  type: String,
  required: true,
};

const usersSchema = new mongoose.Schema(
  {
    username: reqString,
    fullname: reqString,
    email: reqString,
    gender: { type: String },
    bio: { type: String },
    password: reqString,
    profilePic: { type: String },
    followers: [mongoose.Schema.Types.ObjectId],
    following: [mongoose.Schema.Types.ObjectId],
    savedPosts: [mongoose.Schema.Types.ObjectId],
  },
  {
    timestamps: true,
  }
);

const UsersData = mongoose.model('user', usersSchema);

module.exports = UsersData;
