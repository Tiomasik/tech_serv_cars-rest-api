const bcrypt = require("bcrypt");

const User = require("../../db/models/user");
const { httpError } = require("../../helpers");
const { generateToken } = require("../../helpers");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    httpError(res, 400, `User with this email not found`);
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    httpError(res, 401, `Email or password is wrong`);
  }

  const { token } = await generateToken(user._id);
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    status: "success",
    code: 200,
    token,
    result: {
      id: user._id,
      name: user.name,
      email: user.email,
      // phone: user.phone,
      // avatarURL: user.avatarURL,
    },
  });
};

module.exports = login;
