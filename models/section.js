const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Section = sequelize.define('section', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  section_name: Sequelize.STRING
});

module.exports = Section;