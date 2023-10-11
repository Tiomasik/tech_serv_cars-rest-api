const { NotFound, BadRequest } = require("http-errors");
require("dotenv").config();

const { User } = require("../../models/user");
const sendEmail = require("./sendEmail");
const { BASE_URL } = process.env;

const resendEVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new NotFound("User is not found");
  }

  if (user.verify) {
    throw new BadRequest("Verification has already been passed");
  }

  const verifyEmail = {
    to: email,
    subject: "Email verification",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click for verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    status: 200,
    message: "Verification email sent",
  });
};
module.exports = resendEVerifyEmail;
