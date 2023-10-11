const express = require("express");
const router = express.Router();

const { ctrlUsers } = require("../../controllers");
const { validation, ctrlWrapper } = require("../../middlewares");
const { schema } = require("../../models/user");
const { upload } = require("../../middlewares");

router.post(
  "/register",
  validation(schema.registerSchema),
  ctrlWrapper(ctrlUsers.registerUser)
);

router.get("/verify/:verificationToken", ctrlWrapper(ctrlUsers.verifyEmail));

router.post(
  "/verify",
  validation(schema.emailSchema),
  ctrlWrapper(ctrlUsers.resendVerifyEmail)
);

router.post(
  "/login",
  validation(schema.loginSchema),
  ctrlWrapper(ctrlUsers.loginUser)
);

router.get(
  "/current",
  ctrlUsers.authenticate,
  ctrlWrapper(ctrlUsers.getCurrent)
);

router.post(
  "/logout",
  ctrlUsers.authenticate,
  ctrlWrapper(ctrlUsers.logoutUser)
);

router.patch(
  "/",
  ctrlUsers.authenticate,
  validation(schema.patchSchema),
  ctrlWrapper(ctrlUsers.updateSubscriptionUser)
);

router.patch(
  "/avatars",
  ctrlUsers.authenticate,
  upload.single("avatar"),
  ctrlWrapper(ctrlUsers.updateAvatar)
);

module.exports = router;
