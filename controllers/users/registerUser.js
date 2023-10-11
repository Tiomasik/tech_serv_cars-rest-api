const { v4 } = require("uuid");
const { Conflict } = require("http-errors");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
require("dotenv").config();

const { User } = require("../../models/user");
const sendEmail = require("./sendEmail");
const { BASE_URL } = process.env;

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict(`Email in use`);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = v4();

  const result = await User.create({
    ...req.body,
    password: hashedPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Email verification",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click for verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    Status: 201,
    user: {
      email: result.email,
      avatarURL,
      subscription: result.subscription,
    },
  });
};

module.exports = registerUser;
