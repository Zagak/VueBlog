require("dotenv").config();
require("express-async-errors");

const express = require("express");
const server = express();

const authRouter = require("./routes/auth");
const commentRouter = require("./routes/comments");

const auth = require("./middleware/authentication");
const errorHandlerMiddleware = require("./middleware/error-handler");

server.use(express.json());

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
