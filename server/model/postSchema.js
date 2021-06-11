const mongoose = require('mongoose');

const postsSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    imgSrc: { type: String, required: true },
    caption: { type: String, required: true },
    likes: { type: [mongoose.Schema.Types.ObjectId] },
    comments: { type: [mongoose.Schema.Types.ObjectId] },
  },
  {
    timestamps: true,
  }
);
const PostsData = mongoose.model('post', postsSchema);

module.exports = PostsData;
