const Admin = require("../../db/models/admin");

const logout = async (req, res) => {
  const { _id } = req.admin;

  await Admin.findByIdAndUpdate(_id, { token: "" });

  res.json({
    status: "success",
    code: 204,
    message: "Admin logout",
  });
};

module.exports = logout;
