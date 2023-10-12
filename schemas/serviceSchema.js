const Joi = require("joi");

const postSchema = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  place: Joi.string().required(),
  comments: Joi.string(),
});

const schema = { postSchema };

module.exports = schema;
