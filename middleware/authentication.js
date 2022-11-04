const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(400).json({ message: "Wrong Credentials" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    req.auth = {
      userId: verifiedToken.userId,
      role: verifiedToken.role,
    };
    if (!verifiedToken) {
      console.log("hello there");
      return res.status(400).json({ message: "unauthorized request" });
    } else {
      next();
    }
  } catch (e) {
    res.status(400).json({ message: "Wrong Credentials" });
  }
};

module.exports = { auth };
