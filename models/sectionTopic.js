const Sequelize = require("sequelize");
const sequelize = require("../util/database");
const Section = require("../models/section")
const Topic = require("../models/topic")

const sectionTopic = sequelize.define("sectionTopic", {
  sectionId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Section,
      key: 'id'
    }
  },
  topicId:{
    type:Sequelize.INTEGER,
    allowNull:false,
    references:{
      model:Topic,
      key:'id'
    }
  }
});
module.exports = sectionTopic;