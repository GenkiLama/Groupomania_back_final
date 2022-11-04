const validator = require("validator");

const inputValidator = (req, res, next) => {
  const { title, message } = req.body;
  if (
    !validator.isAlphanumeric(title, "fr-FR", { ignore: `' ",.?!;` }) ||
    !validator.isAlphanumeric(message, "fr-FR", { ignore: `' ",.?!;` })
  ) {
    return res.status(400).json({ message: "Invalid input" });
  }
  next();
};

const nameValidator = (req, res, next) => {
  const { name } = req.body;
  if (!validator.isAlphanumeric(name)) {
    return res.status(400).json({ message: "Please provide valid name" });
  }
  next();
};

const emailValidator = (req, res, next) => {
  const { email } = req.body;
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Please provide valid email" });
  }
  next();
};

const passwordValidator = (req, res, next) => {
  const { password } = req.body;
  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({ message: "Please provide strong password" });
  }
  next();
};

module.exports = {
  inputValidator,
  nameValidator,
  emailValidator,
  passwordValidator,
};
