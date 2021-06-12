const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const reqString = {
  type: String,
  required: true,
  trim: true,
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

// hashing the password
usersSchema.pre('save', async function (next) {
  console.log('hello');
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// collection creation
const UsersData = mongoose.model('user', usersSchema);

module.exports = UsersData;
