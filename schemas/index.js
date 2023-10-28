const registerSchema = require("./registerSchema");
const loginSchema = require("./loginSchema");
const serviceSchema = require("./serviceSchema");
const adminSchema = require("./adminSchema");
const userSchema = require("./userSchema ");
const patterns = require("./patterns");

module.exports = {
  patterns,
  serviceSchema,
  registerSchema,
  loginSchema,
  adminSchema,
  userSchema,
};
