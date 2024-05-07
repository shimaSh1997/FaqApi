const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Topic = sequelize.define("topic", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  topic_name: {
    type:Sequelize.STRING,
    allowNull:false
  }
});

module.exports = Topic;
