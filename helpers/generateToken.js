const jwt = require("jsonwebtoken");

const generateToken = async (_id) => {
  const payload = { id: _id };
  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "12h" });
  return { token };
};

module.exports = generateToken;
