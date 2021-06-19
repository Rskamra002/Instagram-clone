const mongoose = require('mongoose');

const HashtagSchema = new mongoose.Schema(
  {
    hashtagName: {
      type: String,
      required: true,
      trim: true,
    },
    postIds: [mongoose.Schema.Types.ObjectId],
  },
  { timestamps: true }
);

const HashtagData = mongoose.model('hashtags', HashtagSchema);

module.exports = HashtagData;
