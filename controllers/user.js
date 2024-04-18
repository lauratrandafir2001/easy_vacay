// import User from "../models/User.js";
const User = require("../models/UserModel.js");

module.exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { _id: id },
      {
        username,
        email,
        password,
      },
      { new: true }
    );
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findOneAndDelete({ _id: id });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports.getUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ _id: id });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
