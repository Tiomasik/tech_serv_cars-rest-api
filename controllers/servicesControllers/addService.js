const Service = require("../../db/models/servicesModel");

const addService = async (req, res) => {
  const service = await Service.create({
    ...req.body,
  });

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      service: {
        service,
      },
    },
  });
};

module.exports = addService;
