const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const Sequelize = require("sequelize");
const sequelize = require("./util/database");

// const sectionRoutes = require('./routes/section');
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const Section = require("./models/section");
const Topic = require("./models/topic");
const sectionTopic = require("./models/sectionTopic");
const qA = require("./models/qA");
const qaTopic = require("./models/qaTopic");
const User = require("./models/user");
const userQa = require("./models/userQa.js");

const app = express();

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json

Section.belongsToMany(Topic, { through: sectionTopic });
Topic.belongsToMany(Section, { through: sectionTopic });
Topic.belongsToMany(qA, { through: qaTopic });
qA.belongsToMany(Topic, { through: qaTopic });
User.belongsToMany(qA, { through: userQa });
qA.belongsToMany(User, { through: userQa });
// Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
// User.hasMany(Product);
sequelize
  .sync({ alter: true })
  .then((result) => {
    // console.log(result);
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

// app.listen(8080);
