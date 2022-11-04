const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  id: {
    type: String,
  },
  userId: {
    type: String,
  },
  author: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  usersLiked: {
    type: [String],
  },
  likes: {
    type: Number,
  },
});

module.exports = mongoose.model("Post", postSchema);
