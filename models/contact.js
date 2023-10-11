const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { mongooseError } = require("../middlewares");

const validateNumber = /\(\d{3}\) \d{3}-\d{4}$/;
const validateEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      match: validateEmail,
    },
    phone: {
      type: String,
      match: validateNumber,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false }
);

contactSchema.post("save", mongooseError);

const Contact = model("contact", contactSchema);

const postSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(validateEmail).required(),
  phone: Joi.string().pattern(validateNumber).required(),
  favorite: Joi.boolean().default(false),
});

const putSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().pattern(validateEmail),
  phone: Joi.string().pattern(validateNumber),
  favorite: Joi.boolean().default(false),
});

const patchFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schema = { postSchema, putSchema, patchFavoriteSchema };

module.exports = { schema, Contact };
