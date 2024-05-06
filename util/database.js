const Sequelize = require("sequelize").Sequelize;

const sequelize = new Sequelize("FAQ", "root", "test@1376", {
  dialect:'mysql',
  host:'localhost'
});
module.exports = sequelize;
