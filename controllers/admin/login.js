const bcrypt = require("bcrypt");

const Admin = require("../../db/models/admin");
const { httpError } = require("../../helpers");
const { generateToken } = require("../../helpers");

const login = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });

  if (!admin) {
    httpError(res, 400, `Admin with this email not found`);
  }
  const isPasswordValid = await bcrypt.compare(password, admin.password);
  if (!isPasswordValid) {
    httpError(res, 401, `Email or password is wrong`);
  }

  const { token } = await generateToken(admin._id);
  await Admin.findByIdAndUpdate(admin._id, { token });

  res.json({
    status: "success",
    code: 200,
    token,
    result: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      // phone: user.phone,
      // avatarURL: user.avatarURL,
    },
  });
};

module.exports = login;
