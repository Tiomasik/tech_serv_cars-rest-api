const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/admin");
const asyncWrapper = require("../../helpers/asyncWrapper");
const validation = require("../../middlewares/validation");
const validateImage = require("../../middlewares/validateImage");
const uploadImageFcn = require("../../middlewares/uploadImageFcn");
const schema = require("../../schemas");
const { authenticateAdmin } = require("../../middlewares");

router.post(
  "/register",
  validation(schema.registerSchema),
  asyncWrapper(ctrl.register)
);

router.post("/login", validation(schema.loginSchema), asyncWrapper(ctrl.login));

router.post("/logout", authenticateAdmin, asyncWrapper(ctrl.logout));

router.put(
  "/",
  authenticateAdmin,
  validateImage,
  uploadImageFcn.single("imageURL"),
  validation(schema.adminSchema),
  asyncWrapper(ctrl.updateAdmin)
);

module.exports = router;
