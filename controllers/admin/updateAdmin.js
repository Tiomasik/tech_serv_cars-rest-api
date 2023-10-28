const Admin = require("../../db/models/admin");
const fs = require("fs/promises");
const path = require("path");

const configCloudinary = require("../servicesControllers/configCloudinary");
const httpError = require("../../helpers/httpError");

const updateAdmin = async (req, res, next) => {
  const { _id } = req.admin;

  let url = "";
  const adminId = await Admin.findById(_id);
  url = adminId.imageURL;

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
  const admin = await Admin.findByIdAndUpdate(
    { _id },
    { ...req.body, imageURL: url },
    {
      new: true,
    }
  );

  if (admin.length === 0) {
    return next(httpError(404, `Service with id=${_id} is not found`));
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      admin: {
        name: admin.name,
        email: admin.email,
        imageURL: admin.imageURL,
      },
    },
  });
};

module.exports = updateAdmin;
