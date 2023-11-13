const jwt = require("jsonwebtoken");

const Admin = require("../db/models/admin");
const { httpError } = require("../helpers");

const { SECRET_KEY } = process.env;

const authenticateAdmin = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    return next(httpError(res, 401, `Admin is not authorise 'Bearer'`));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const admin = await Admin.findById(id);
    if (!admin) {
      return httpError(res, 401, `Admin does not exist`);
    }
    if (!admin.token || admin.token !== token) {
      return httpError(res, 401, `Admin is not authorise 'token'`);
    }
    req.admin = admin;
    next();
  } catch {
    return next(httpError(res, 401, `Admin is not authorise 'catch'`));
  }
};

module.exports = authenticateAdmin;
