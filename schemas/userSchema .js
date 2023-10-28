const Joi = require("joi");

const { emailPattern, passwordPattern } = require("./patterns");

const userSchema = Joi.object({
  email: Joi.string().pattern(emailPattern).min(10).max(64),
  password: Joi.string().pattern(passwordPattern).min(7).max(32),
  name: Joi.string(),
});

module.exports = userSchema;
