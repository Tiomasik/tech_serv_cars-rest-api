const Service = require("../../db/models/servicesModel");
const fs = require("fs/promises");
const path = require("path");

const configCloudinary = require("./configCloudinary");

const addService = async (req, res) => {
  // const { _id: owner } = req.user;
  const { path: tmpUpload, originalname } = req.file;
  const titleArray = req.body.title.toLowerCase().split(" ");
  const fileName = `${originalname}`;
  const tmpDir = path.dirname(tmpUpload);
  const resultUpload = path.join(tmpDir, fileName);

  fs.rename(tmpUpload, resultUpload);
  const result = await configCloudinary(fileName, resultUpload);

  const service = await Service.create({
    ...req.body,
    imageURL: result.url,
    titleArray,
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
