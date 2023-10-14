const express = require("express");
const router = express.Router();

const asyncWrapper = require("../../helpers/asyncWrapper");
const uploadService = require("../../middlewares/uploadService");
const validatorService = require("../../middlewares/validatorService");
const validateImage = require("../../middlewares/validateImage");
const ctrServices = require("../../controllers/servicesControllers");

router.get("/", asyncWrapper(ctrServices.getAllServices));
router.post(
  "/user",
  validateImage,
  uploadService.single("imageURL"),
  validatorService(),
  asyncWrapper(ctrServices.addService)
);

module.exports = router;
