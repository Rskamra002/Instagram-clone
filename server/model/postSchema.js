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
    imgSrc: reqString,
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
      },
    ],
    tagUser: [mongoose.Schema.Types.ObjectId],
    tags: [mongoose.Schema.Types.ObjectId],
  },
  {
    timestamps: true,
  }
);
const PostsData = mongoose.model('post', postsSchema);

module.exports = PostsData;
