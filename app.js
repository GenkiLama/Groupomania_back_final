require("dotenv").config();
const mongoose = require("mongoose");
const path = require("path");
const express = require("express");
const app = express();
const mongoSanitize = require("express-mongo-sanitize");
const postRouter = require("./routes/postRouter");
const authRouter = require("./routes/auth");

const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(mongoSanitize());
app.use("/api/posts", postRouter);
app.use("/api/auth", authRouter);
app.use("/images", express.static(path.join(__dirname, "images")));
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:admin@cluster0.zks1k.mongodb.net/training?retryWrites=true&w=majority"
    );
    app.listen(port, () => console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
