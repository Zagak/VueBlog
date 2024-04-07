const db = require("../models");
const CustomError = require("../errors/custom-error");
const { StatusCodes } = require("http-status-codes");

const User = db.user;
const Token = db.token;

const register = async (req, res) => {
  const user = await User.create(req.body);
  const refreshToken = user.createRefreshJWT();
  await Token.create({ refreshToken, UserId: user.id });

  return res.status(200).json(user.createAccesJWT());
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

  return res.status(200).json(user.createAccesJWT());
};

module.exports = { register, login };
