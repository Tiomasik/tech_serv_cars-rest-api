const Service = require("../../db/models/services");

const getAllServices = async (req, res) => {
  const { page = 1, limit = 12 } = req.query;

  // const { _id: owner } = req.user;
  // const queryBody = { owner };

  const skip = (page - 1) * limit;
  const queryBody = {};

  const services = await Service.find(queryBody, "", {
    skip,
    limit,
  });

  if (!services.length) {
    return res.json({
      status: "success",
      code: 200,
      message: "No data found",
    });
  }

  const filterKeysServices = services.map((service) => {
    return {
      id: service._id,
      title: service.title,
      place: service.place,
      price: service.price,
      imageURL: service.imageURL,
    };
  });

  res.json({
    status: "success",
    code: 200,
    data: {
      services: filterKeysServices,
      pagination: {
        page,
        limit,
      },
    },
  });
};

module.exports = getAllServices;
