const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer");
const {
  getPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
  likePost,
} = require("../controllers/postController");
const { auth } = require("../middleware/authentication");
const { hasPermission } = require("../middleware/permission");
const { inputValidator } = require("../middleware/inputValidator");
router.get("/", auth, getPosts);
router.get("/:id", auth, getPost);
router.post("/", auth, multer, inputValidator, createPost);
router.delete("/:id", auth, hasPermission, deletePost);
router.put(
  "/:id/edit",
  auth,
  hasPermission,
  multer,
  inputValidator,
  updatePost
);
router.post("/:id", auth, likePost);
module.exports = router;
