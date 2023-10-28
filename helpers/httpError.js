const errorMessageList = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not found",
  409: "Conflict",
};

const httpError = (res, status, message = errorMessageList[status]) => {
  console.log(status);
  return res.status(status).json({ message });
};

module.exports = httpError;
