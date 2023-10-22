const express = require("express");
const router = express.Router();

const asyncWrapper = require("../../helpers/asyncWrapper");
const uploadService = require("../../middlewares/uploadService");
const validateImage = require("../../middlewares/validateImage");
const ctrServices = require("../../controllers/servicesControllers");
const validation = require("../../middlewares/validation");
const schema = require("../../schemas");
const { authenticate } = require("../../middlewares");

router.get("/", asyncWrapper(ctrServices.getAllServices));
router.get("/:serviceId", asyncWrapper(ctrServices.getServiceById));
router.post(
  "/user",
  authenticate,
  validateImage,
  uploadService.single("imageURL"),
  validation(schema.serviceSchema),
  asyncWrapper(ctrServices.addService)
);

module.exports = router;
