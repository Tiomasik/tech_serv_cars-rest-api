const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { mongooseError } = require("../middlewares");

const validateEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    email: {
      type: String,
      match: validateEmail,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      marginLeft: 8,
      required: [true, "Set password for user"],
    },
    avatarURL: {
      type: String,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false }
);

userSchema.post("save", mongooseError);

const User = model("user", userSchema);

const registerSchema = Joi.object({
  email: Joi.string().pattern(validateEmail).required(),
  password: Joi.string().min(8).required(),
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .default("starter"),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(validateEmail).required(),
  password: Joi.string().min(8).required(),
});

const patchSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(validateEmail).required(),
});

const schema = { registerSchema, loginSchema, patchSchema, emailSchema };

module.exports = { schema, User };
