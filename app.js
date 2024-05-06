const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");

// const sectionRoutes = require('./routes/section');
const userRoutes = require("./routes/user");

const app = express();

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
app.use(
  session({ secret: "my secret", resave: false, saveUninitialized: false })
);

app.use("/user", userRoutes);

app.listen(8080);
