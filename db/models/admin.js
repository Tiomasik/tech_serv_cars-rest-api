const { Schema, model } = require("mongoose");

const mongooseError = require("../../middlewares/mongooseError");

const adminSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Password is required"],
    },
    // name: {
    //   type: String,
    //   minlength: 3,
    //   maxlength: 20,
    //   default: "",
    // },
    // phone: {
    //   type: String,
    //   maxlength: 13,
    //   default: "",
    // },
    // city: {
    //   type: String,
    //   default: "",
    // },
    // avatarURL: {
    //   type: String,
    // },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

adminSchema.post("save", mongooseError);

const Admin = model("admin", adminSchema);

module.exports = Admin;
