const Sequelize = require("sequelize");
const sequelize = require("../util/database");
const User = require("../models/user");
const Qa = require("../models/qA");

const userQa = sequelize.define("userQa", {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  qaId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Qa,
      key: "id",
    },
  },
  isLike:{
    type: Sequelize.BOOLEAN,
    allowNull: true
  },
  viewCount:{
    type:Sequelize.INTEGER,
    allowNull:false,
    defaultValue:0
  }
});
module.exports = userQa;
