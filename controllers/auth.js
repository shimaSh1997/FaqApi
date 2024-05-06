const User = require("../models/user");

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ where: { email: email, password: password } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Invalid user data" });
      }
      req.session.userId = user.id;
      req.session.userRole = user.role;

      res.json({ message: "Login Successful" });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};
