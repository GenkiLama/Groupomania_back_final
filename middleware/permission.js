const Post = require("../models/Post");
const mongoose = require("mongoose");

const hasPermission = async (req, res, next) => {
  const thisId = req.params.id;
  console.log("1", req.params);
  const { id } = req.params;
  console.log("2", thisId);
  console.log("3", id);

  /* if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "sneaky bastard" });
  } */
  const post = await Post.findOne({ _id: req.params.id });
  if (!post) {
    return res.status(400).json({
      message: "post does not exist",
    });
  }
  if (post.userId === req.auth.userId || req.auth.role === "admin") {
    next();
  } else {
    return res.status(401).json({
      message: "pas autorise",
    });
  }
  /* if (!post) {
    console.log(`COUCOU2222`);
    return res.status(400).json({
      message: "post does not exist",
    });
  }
  if (post.userId === req.auth.userId || req.auth.role === "admin") {
    next();
  } else {
    return res.status(401).json({
      message: "pas autorise",
    });
  } */
};
module.exports = {
  hasPermission,
};
