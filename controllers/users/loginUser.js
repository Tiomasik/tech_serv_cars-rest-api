const { Unauthorized } = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { User } = require("../../models/user");

const SECRET_KEY = "zxcvbnmasdfghjqwertyu";

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new Unauthorized(`Email or password is wrong`);
  }

  if (!user.verify) {
    throw new Unauthorized("User is not verified");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw new Unauthorized(`Email or password is wrong`);
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    Status: 200,
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = loginUser;
