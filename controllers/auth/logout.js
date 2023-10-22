const User = require("../../db/models/user");

const logout = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({
    status: "success",
    code: 204,
    message: "User logout",
  });
};

module.exports = logout;
