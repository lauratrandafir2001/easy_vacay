const express = require("express");

const authRouter = require("./auth");
const usersRouter = require("./users");
const hotelsRouter = require("./hotels");
const roomsRouter = require("./rooms");

const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/hotels", hotelsRouter);
apiRouter.use("/rooms", roomsRouter);

module.exports = apiRouter;
