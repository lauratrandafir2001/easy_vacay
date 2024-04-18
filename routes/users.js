const express = require("express");
const {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} = require("../controllers/user.js");

const usersRouter = express.Router();

usersRouter.put("/:id", updateUser);

usersRouter.delete("/:id", deleteUser);

usersRouter.get("/:id", getUser);

usersRouter.get("/", getUsers);

module.exports = usersRouter;
