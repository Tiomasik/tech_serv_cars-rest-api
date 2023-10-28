const Joi = require("joi");

const postSchema = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  place: Joi.string().required(),
  comments: Joi.string(),
});

const putSchema = Joi.object({
  title: Joi.string().min(3).max(30),
  place: Joi.string(),
  comments: Joi.string(),
});

const serviceSchema = { postSchema, putSchema };

module.exports = serviceSchema;
