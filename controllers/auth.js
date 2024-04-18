const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jwt-simple");

module.exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    const missingFields = [];
    if (!username) missingFields.push("username");
    if (!email) missingFields.push("email");
    if (!password) missingFields.push("password");

    // Return an error response with the missing fields
    return res.status(400).json({
      message: `Please fill all the fields. The following fields are missing: ${missingFields.join(
        ", "
      )}`,
    });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  const { authorization } = req.headers;
  const { username, password } = req.body;

  if (!username || !password) {
    const missingFields = [];
    if (!username) missingFields.push("username");
    if (!password) missingFields.push("password");

    // Return an error response with the missing fields
    return res.status(400).json({
      message: `Please fill all the fields. The following fields are missing: ${missingFields.join(
        ", "
      )}`,
    });
  }

  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return next(err);
      }
      if (!result) {
        return res.status(401).send({
          error:
            "The credentials you provided are incorrect, please try again.",
        });
      }

      res.send({
        user,
        token: jwt.encode({ id: user._id }, "dwqdwqdwq"),
      });
    });
  } catch (error) {
    next(error);
  }
};
