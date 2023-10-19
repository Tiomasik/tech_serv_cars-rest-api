const express = require("express");
const router = express.Router();

const asyncWrapper = require("../../helpers/asyncWrapper");
const uploadService = require("../../middlewares/uploadService");
const validateImage = require("../../middlewares/validateImage");
const ctrServices = require("../../controllers/servicesControllers");
const validation = require("../../middlewares/validation");
const schema = require("../../schemas");
const { authenticate } = require("../../middlewares");

router.get("/", authenticate, asyncWrapper(ctrServices.getAllServices));
router.post(
  "/user",
  authenticate,
  validateImage,
  uploadService.single("imageURL"),
  validation(schema.serviceSchema),
  asyncWrapper(ctrServices.addService)
);

module.exports = router;
