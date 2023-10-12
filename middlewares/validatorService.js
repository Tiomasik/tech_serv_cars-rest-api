const schema = require("../schemas/serviceSchema");

const validatorService = () => {
  return (req, res, next) => {
    const { error } = schema.postSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: `${error}` });
      next(error);
    }
    next();
  };
};

module.exports = validatorService;
