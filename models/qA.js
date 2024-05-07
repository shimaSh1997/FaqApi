const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const QA = sequelize.define('qa', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  question:{
    type:Sequelize.TEXT,
    allowNull:false
  },
  answer:{
    type:Sequelize.TEXT,
    allowNull:false
  }
});

module.exports = QA;