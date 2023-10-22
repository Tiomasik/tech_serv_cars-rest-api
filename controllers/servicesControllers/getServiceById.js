const Service = require("../../db/models/services");

const httpError = require("../../helpers/httpError");

const getServiceById = async (req, res, next) => {
  const { serviceId: _id } = req.params;
  const service = await Service.findById(_id);

  if (service.length === 0) {
    return next(httpError(404, `Service with id=${_id} is not found`));
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      service: {
        id: _id,
        title: service.title,
        place: service.place,
        imageURL: service.imageURL,
        comments: service.comments,
        price: service.price,
        owner: service.owner,
      },
    },
  });
};

module.exports = getServiceById;
