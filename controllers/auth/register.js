const bcrypt = require("bcrypt");
// const asyncHandler = require("express-async-handler");
// const gravatar = require('gravatar');

const User = require("../../db/models/user");
const { httpError } = require("../../helpers");

// const { findUserByEmail } = require('../../services/authService');
// const getError = require("../../helpers/getError");
const { generateToken } = require("../../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    httpError(res, 409, `Email or password is wrong`);
  }
  // const avatarURL = gravatar.url(email);
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  // const [name] = email.split("@").slice(0, 1);
  const newUser = await User.create({
    ...req.body,
    // name: name,
    password: hashPassword,
    // avatarURL,
  });
  const { token } = await generateToken(newUser._id);
  await User.findByIdAndUpdate(newUser._id, { token });

  res.status(201).json({
    status: "success",
    code: 201,
    token,
    result: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      // avatarURL: newUser.avatarURL,
    },
  });
};

module.exports = register;
