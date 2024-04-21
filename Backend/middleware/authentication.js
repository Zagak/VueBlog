const CustomError = require("../errors/custom-error");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (
    req.path === "/data" &&
    req.method === "GET" &&
    authHeader.split(" ")[1] === "null"
  )
    return next();

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
