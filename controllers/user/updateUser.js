const User = require("../../db/models/user");
const fs = require("fs/promises");
const path = require("path");

const configCloudinary = require("../servicesControllers/configCloudinary");
const httpError = require("../../helpers/httpError");

const updateUser = async (req, res, next) => {
  const { _id } = req.user;

  let url = "";
  const userId = await User.findById(_id);
  url = userId.imageURL;

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
  const user = await User.findByIdAndUpdate(
    { _id },
    { ...req.body, imageURL: url },
    {
      new: true,
    }
  );

  if (user.length === 0) {
    return next(httpError(404, `Service with id=${_id} is not found`));
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      user: {
        name: user.name,
        email: user.email,
        imageURL: user.imageURL,
      },
    },
  });
};

module.exports = updateUser;
