const mongoose = require('mongoose');

const reqString = {
  type: String,
  required: true,
  trim: true,
};

const storySchema = mongoose.Schema(
  {
    img: reqString,
    userProfile: reqString,
    userName: reqString,
    view: [mongoose.Schema.Types.String],
  },
  {
    timestamps: true,
  }
);
const StoryData = mongoose.model('story', storySchema);

module.exports = StoryData;
