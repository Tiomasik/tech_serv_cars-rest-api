const registerUser = require("./registerUser");
const loginUser = require("./loginUser");
const authenticate = require("./authenticate");
const getCurrent = require("./getCurrent");
const logoutUser = require("./logoutUser");
const updateSubscriptionUser = require("./updateSubscriptionUser");
const updateAvatar = require("./updateAvatar");
const verifyEmail = require("./verifyEmail");
const resendVerifyEmail = require("./resendVerifyEmail");

module.exports = {
  registerUser,
  loginUser,
  authenticate,
  getCurrent,
  logoutUser,
  updateSubscriptionUser,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
};
