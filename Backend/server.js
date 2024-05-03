require("dotenv").config();
require("express-async-errors");

const express = require("express");
const cookieParser = require("cookie-parser");

const server = express();

const authRouter = require("./routes/auth");
const commentRouter = require("./routes/comments");

const auth = require("./middleware/authentication");
const errorHandlerMiddleware = require("./middleware/error-handler");

//extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");

server.use(express.json());
server.use(helmet());
server.use(
  cors({
    mode: "no-cors",
    //origin: process.env.CLIENT_URI, // Replace with the origin you want to allow
    credentials: true, // Set to true to allow credentials
  })
);
server.use(xss());
server.use(cookieParser());

server.use("/api/v1/auth", authRouter);
server.use("/api/v1/comment", auth, commentRouter);

server.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    server.listen(port, () => {
      console.log(`Server is listening to port ${port} ...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
