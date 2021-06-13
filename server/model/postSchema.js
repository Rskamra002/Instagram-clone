const mongoose = require('mongoose');

const reqString = {
  type: String,
  required: true,
  trim: true,
};

const postsSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    src: reqString,
    caption: { type: String, trim: true },
    likes: [mongoose.Schema.Types.ObjectId],
    comments: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user',
          required: true,
        },
        comment: reqString,
        likes: [mongoose.Schema.Types.ObjectId],
      },
    ],
    tagUser: [mongoose.Schema.Types.ObjectId],
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tags',
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);
const PostsData = mongoose.model('post', postsSchema);

module.exports = PostsData;
