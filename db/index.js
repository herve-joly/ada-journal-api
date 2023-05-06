const { User } = require("../models/User");
const { Journal } = require("../models/Journal");
const { sequelize, Sequelize } = require("./db");

User.hasMany(Journal);
Journal.belongsTo(User, { foreignKey: "ownerId" });

module.exports = {
  User,
  Journal,
  sequelize,
  Sequelize,
};
