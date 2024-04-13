const CustomError = require("../errors/custom-error");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  if (req.path === "/data" && req.method === "GET") {
    return next();
  }

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new CustomError(StatusCodes.UNAUTHORIZED, "Authentication invalid");
  }

  const accesToken = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(accesToken, process.env.JWT_ACC_SECRET);

    req.user = {
      userId: payload.userId,
      name: payload.name,
      email: payload.email,
    };

    next();
  } catch (err) {
    throw new CustomError(StatusCodes.UNAUTHORIZED, "Authentication invalid");
  }
};

module.exports = auth;