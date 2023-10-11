const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");

const { User } = require("../../models/user");

const SECRET_KEY = "zxcvbnmasdfghjqwertyu";

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    return next(new Unauthorized(`User is not login`));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user) {
      return next(new Unauthorized(`User is not found`));
    }

    if (!user.token || user.token !== token) {
      return next(new Unauthorized(`Not authorized`));
    }

    req.user = user;
    next();
  } catch (error) {
    next(new Unauthorized(`Token is wrong`));
  }
};

module.exports = authenticate;
