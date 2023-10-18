const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/auth");
const asyncWrapper = require("../../helpers/asyncWrapper");
const validation = require("../../middlewares/validation");
const schema = require("../../schemas");
// const authenticate = require("../../middlewares/auth");

// register відповідає за реєстрацію користувача
router.post(
  "/register",
  validation(schema.registerSchema),
  asyncWrapper(ctrl.register)
);

// // login відповідає за логінізацію користувача
router.post("/login", validation(schema.loginSchema), asyncWrapper(ctrl.login));

// // logout відповідає за вихід користувача зі свого профілю
// router.post("/logout", authenticate, ctrl.logout);

module.exports = router;
