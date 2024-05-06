const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const Sequelize = require("sequelize");
const sequelize = require("./util/database");

// const sectionRoutes = require('./routes/section');
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");


const app = express();

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
// app.use(
//   session({ secret: "my secret", resave: false, saveUninitialized: false })
// );
sequelize
  .sync()
  .then((result) => {
    // console.log(result);
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/user", userRoutes);
app.use('/auth',authRoutes)

// app.listen(8080);
