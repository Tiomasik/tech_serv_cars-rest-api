const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/user");
const asyncWrapper = require("../../helpers/asyncWrapper");
const validation = require("../../middlewares/validation");
const validateImage = require("../../middlewares/validateImage");
const schema = require("../../schemas");
const uploadImageFcn = require("../../middlewares/uploadImageFcn");
const { authenticateUser } = require("../../middlewares");

router.post(
  "/register",
  validation(schema.registerSchema),
  asyncWrapper(ctrl.register)
);

router.post("/login", validation(schema.loginSchema), asyncWrapper(ctrl.login));

router.post("/logout", authenticateUser, asyncWrapper(ctrl.logout));

router.put(
  "/",
  authenticateUser,
  validateImage,
  uploadImageFcn.single("imageURL"),
  validation(schema.userSchema),
  asyncWrapper(ctrl.updateUser)
);

module.exports = router;
