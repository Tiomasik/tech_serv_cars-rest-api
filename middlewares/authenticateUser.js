const jwt = require("jsonwebtoken");

const User = require("../db/models/user");
const { httpError } = require("../helpers");

const { SECRET_KEY } = process.env;

const authenticateUser = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    return next(httpError(res, 401, `User is not authorise`));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user) {
      return httpError(res, 401, `User does not exist`);
    }
    if (!user.token || user.token !== token) {
      return httpError(res, 401, `User is not authorise`);
    }
    req.user = user;
    next();
  } catch {
    return next(httpError(res, 401, `User is not authorise`));
  }
};

module.exports = authenticateUser;
