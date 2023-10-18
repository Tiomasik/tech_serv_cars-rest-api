const Joi = require("joi");

const serviceSchema = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  place: Joi.string().required(),
  comments: Joi.string(),
});

module.exports = serviceSchema;
