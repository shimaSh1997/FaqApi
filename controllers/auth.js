const User = require("../models/user");
const bcrypt = require("bcrypt");
const { json } = require("body-parser");
const jwt = require("jsonwebtoken");

exports.postSignup = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const role = req.body.role;
  // const confirmPassword = req.body.confirmPassword;
  try {
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: "Username is already taken" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username: username,
      password: hashedPassword,
      role: role,
    });
    console.log("logger newUser: ", newUser)

    // const token = jwt.sign({ userId: newUser[0].id }, "your_secret_key", {
    //   expiresIn: "1h",
    // });
    // console.log("newUser: ", newUser[0]);
    res.status(201).json({message:"User successfully created" });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
exports.postLogin = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({ where: { username } }).then((user) => {
    console.log("in login: ", user)
    if (!user) {
      return res.status(401).json({ message: "Invalid username or passwords" });
    }
    bcrypt
      .compare(password, user.dataValues.password)
      .then((isPasswordValid) => {
        if (!isPasswordValid) {
          return res
            .status(401)
            .json({ message: "Invalid username or passwords" });
        }
        const token = jwt.sign(
          { userId: user.dataValues.id, role: user.dataValues.role },
          "your_secret_key"
        );
        res.json({ token });
      })
      .catch((err) => {
        res.status(500).json({ err: err.message });
      });
  });
};
