const multer = require("multer");

const tempDir = require("../path");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadImageFcn = multer({ storage: multerConfig });

module.exports = uploadImageFcn;
