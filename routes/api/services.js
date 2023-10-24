const express = require("express");
const router = express.Router();

const asyncWrapper = require("../../helpers/asyncWrapper");
const uploadService = require("../../middlewares/uploadService");
const validateImage = require("../../middlewares/validateImage");
const ctrServices = require("../../controllers/servicesControllers");
const validation = require("../../middlewares/validation");
const schema = require("../../schemas");
const { authenticateAdmin } = require("../../middlewares");

router.get("/", asyncWrapper(ctrServices.getAllServices));

router.get("/:serviceId", asyncWrapper(ctrServices.getServiceById));

router.post(
  "/admin",
  authenticateAdmin,
  validateImage,
  uploadService.single("imageURL"),
  validation(schema.serviceSchema),
  asyncWrapper(ctrServices.addService)
);

router.put(
  "/admin/:serviceId",
  authenticateAdmin,
  validateImage,
  uploadService.single("imageURL"),
  validation(schema.serviceSchema),
  asyncWrapper(ctrServices.updateService)
);

router.delete(
  "/admin/:serviceId",
  authenticateAdmin,
  asyncWrapper(ctrServices.deleteService)
);

module.exports = router;
