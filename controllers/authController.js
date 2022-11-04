const User = require("../models/User");

const register = async (req, res) => {
  const { email, name, password } = req.body;
  const emailAlreadyExists = await User.findOne({ email }).catch((e) =>
    console.log(e)
  );
  if (emailAlreadyExists) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  const token = await user.createJWT();
  res.status(200).json({
    userId: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide Email and Password" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }

  const token = user.createJWT();
  res.status(200).json({
    userId: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
    token,
  });
};
module.exports = {
  register,
  login,
};
