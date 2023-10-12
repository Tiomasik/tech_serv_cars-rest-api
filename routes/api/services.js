const express = require("express");
const router = express.Router();

const asyncWrapper = require("../../helpers/asyncWrapper");
const validatorService = require("../../middlewares/validatorService");
const ctrServices = require("../../controllers/servicesControllers");

router.get("/", asyncWrapper(ctrServices.getAllServices));
router.post("/user", validatorService(), asyncWrapper(ctrServices.addService));

module.exports = router;
