const validation = (validateSchema) => {
  return (req, __, next) => {
    const { error } = validateSchema.validate(req.body);

    if (error) {
      error.status = 400;
      next(error);
    }

    next();
  };
};

module.exports = validation;
