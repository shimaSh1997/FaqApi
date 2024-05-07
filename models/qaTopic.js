const Sequelize = require("sequelize");
const sequelize = require("../util/database");
const Qa = require("../models/qA")
const Topic = require("../models/topic")

const qaTopic = sequelize.define("qaTopic", {
  qaId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Topic,
      key: 'id'
    }
  },
  topicId:{
    type:Sequelize.INTEGER,
    allowNull:false,
    references:{
      model:Qa,
      key:'id'
    }
  }
});
module.exports = qaTopic;