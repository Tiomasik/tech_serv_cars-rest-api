const { Schema, model } = require("mongoose");

const mongooseError = require("../../middlewares/mongooseError");

const servicesSchema = new Schema(
  {
    title: {
      type: String,
      minlength: 3,
      maxlength: 30,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    comments: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
    },
    imageURL: {
      type: String,
      default: "",
      // required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

servicesSchema.post("save", mongooseError);

const Service = model("service", servicesSchema);

module.exports = Service;
