const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const {
  nameValidator,
  emailValidator,
  passwordValidator,
} = require("../middleware/inputValidator");
router.post("/register", nameValidator, emailValidator, register);
router.post("/login", emailValidator, login);
module.exports = router;
