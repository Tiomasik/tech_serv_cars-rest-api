const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/auth");
const asyncWrapper = require("../../helpers/asyncWrapper");
const validation = require("../../middlewares/validation");
const schema = require("../../schemas");
const { authenticateUser } = require("../../middlewares");

router.post(
  "/register",
  validation(schema.registerSchema),
  asyncWrapper(ctrl.register)
);

router.post("/login", validation(schema.loginSchema), asyncWrapper(ctrl.login));

router.post("/logout", authenticateUser, asyncWrapper(ctrl.logout));

module.exports = router;
