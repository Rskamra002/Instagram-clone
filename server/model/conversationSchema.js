const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);

const ConversationData= mongoose.model("conversation", ConversationSchema);

module.exports = ConversationData