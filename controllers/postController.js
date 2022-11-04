const Post = require("../models/Post");
const fs = require("fs");
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    if (!posts) {
      res.status(400).json({ message: "No post to display" });
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    if (!post) {
      return res.status(400).json({ message: "No post to display" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error });
  }
};

const createPost = async (req, res) => {
  let imgUrl = "";
  if (req.file) {
    imgUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
  }
  const post = new Post({
    title: req.body.title,
    message: req.body.message,
    userId: req.auth.userId,
    imageUrl: imgUrl,
    author: req.body.author,
    usersLiked: [],
    likes: 0,
    comments: [],
  });
  await Post.create(post);
  res.status(201).json(post);
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });

    if (!post) {
      return res.status(400).json({ message: "post does not exist" });
    }
    if (post.userId != req.auth.userId && req.auth.role != "admin") {
      return res.status(400).json({ message: "Unauthorized request" });
    }
    const imgName = post.imageUrl.split("/images")[1];
    fs.unlink(`images/${imgName}`, async () => {
      await post.remove();
      res.status(200).json(req.params.id);
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });

    if (!post) {
      return res.status(400).json({ message: "post does not exist" });
    }
    if (post.userId != req.auth.userId && req.auth.role != "admin") {
      return res.status(400).json({ message: "Unauthorized request" });
    }
    let imgUrl = "";
    let postObj = {};
    if (req.file) {
      const imgName = post.imageUrl.split("/images")[1];
      fs.unlink(`images/${imgName}`, () => {
        console.log("Image supprimée");
      });
      imgUrl = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`;
      postObj = {
        ...req.body,
        imageUrl: imgUrl,
      };
    } else {
      postObj = { ...req.body };
    }
    const updatedPost = await Post.updateOne(
      {
        _id: req.params.id,
      },
      {
        ...postObj,
        _id: req.params.id,
      }
    );
    return res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({ error });
  }
};

const likePost = async (req, res) => {
  const { like } = req.body;
  const { userId } = req.auth;
  const alreadyLiked = await Post.findOne({ _id: req.params.id });
  if (like === 1 && !alreadyLiked.usersLiked.includes(userId)) {
    const post = await Post.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $push: { usersLiked: userId }, $inc: { likes: +1 } },
      { returnOriginal: false }
    );
    return res.status(200).json(post);
  }
  if (like === -1 && alreadyLiked.usersLiked.includes(userId)) {
    const post = await Post.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $pull: { usersLiked: userId }, $inc: { likes: -1 } },
      { returnOriginal: false }
    );
    return res.status(200).json(post);
  }
};

module.exports = {
  getPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
  likePost,
};
