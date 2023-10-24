const Service = require("../../db/models/services");

const httpError = require("../../helpers/httpError");

const deleteService = async (req, res, next) => {
  const { serviceId: _id } = req.params;
  const service = await Service.findByIdAndRemove({ _id });

  if (!service) {
    return next(httpError(404, `Service with id=${_id} is not found`));
  }

  res.json({
    status: "success",
    code: 200,
    message: `Service with id=${_id} was deleted`,
    data: {
      service: {
        id: _id,
        categories: service.categories,
        title: service.title,
        name: service.name,
      },
    },
  });
};

module.exports = deleteService;
