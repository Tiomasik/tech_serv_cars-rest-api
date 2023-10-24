const bcrypt = require("bcrypt");
// const gravatar = require('gravatar');

const Admin = require("../../db/models/admin");
const { httpError } = require("../../helpers");

// const { findUserByEmail } = require('../../services/authService');
const { generateToken } = require("../../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (admin) {
    httpError(res, 409, `Email already exists`);
  }
  // const avatarURL = gravatar.url(email);
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  // const [name] = email.split("@").slice(0, 1);
  const newAdmin = await Admin.create({
    ...req.body,
    // name: name,
    password: hashPassword,
    // avatarURL,
  });
  const { token } = await generateToken(newAdmin._id);
  await Admin.findByIdAndUpdate(newAdmin._id, { token });

  res.status(201).json({
    status: "success",
    code: 201,
    token,
    result: {
      id: newAdmin._id,
      name: newAdmin.name,
      email: newAdmin.email,
      // avatarURL: newAdmin.avatarURL,
    },
  });
};

module.exports = register;
