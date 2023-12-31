const Service = require("../../db/models/services");
const fs = require("fs/promises");
const path = require("path");

const configCloudinary = require("./configCloudinary");
const httpError = require("../../helpers/httpError");

const updateService = async (req, res, next) => {
  const { serviceId: _id } = req.params;

  let url = "";
  const serviceId = await Service.findById(_id);
  url = serviceId.imageURL;

  if (req.file) {
    const { path: tmpUpload, originalname } = req.file;

    const fileName = `${_id}_${originalname}`;
    const tmpDir = path.dirname(tmpUpload);
    const resultUpload = path.join(tmpDir, fileName);

    await fs.rename(tmpUpload, resultUpload);
    const result = await configCloudinary(fileName, resultUpload);
    await fs.unlink(resultUpload);
    url = result.url;
  }
  const service = await Service.findByIdAndUpdate(
    { _id },
    { ...req.body, imageURL: url },
    {
      new: true,
    }
  );

  if (service.length === 0) {
    return next(httpError(404, `Service with id=${_id} is not found`));
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      service: {
        title: service.title,
        place: service.place,
        imageURL: service.imageURL,
        comments: service.comments,
        price: service.price,
      },
    },
  });
};

module.exports = updateService;
