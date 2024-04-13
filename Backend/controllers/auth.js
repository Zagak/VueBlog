const db = require("../models");
const CustomError = require("../errors/custom-error");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const User = db.user;
const Token = db.token;

const register = async (req, res) => {
  const user = await User.create(req.body);
  const refreshToken = user.createRefreshJWT();
  await Token.create({ refreshToken, UserId: user.id });

  const accesToken = user.createAccesJWT();

  return res.status(200).json({ refreshToken, accesToken });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new CustomError(
      StatusCodes.BAD_REQUEST,
      "Provide email and password"
    );

  const user = await User.findOne({ where: { email: email } });
  if (!user)
    throw new CustomError(StatusCodes.UNAUTHORIZED, "Invalid credentials");

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect)
    throw new CustomError(StatusCodes.UNAUTHORIZED, "Wrong password");

  const refreshToken = user.createRefreshJWT();
  await Token.create({ refreshToken, UserId: user.id });

  const accesToken = user.createAccesJWT();

  return res.status(200).json({ refreshToken, accesToken });
};

const token = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new CustomError(StatusCodes.UNAUTHORIZED, "Authentication invalid");
  }

  const refreshToken = authHeader.split(" ")[1];

  const { userId } = jwt.verify(refreshToken, process.env.JWT_RFS_SECRET);

  const user = await User.findOne({ where: { id: userId } });

  const accesToken = user.createAccesJWT();

  res.status(StatusCodes.OK).json({ accesToken });
};

module.exports = { register, login, token };
