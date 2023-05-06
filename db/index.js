const { User } = require("../models/User");
const { Journal } = require("../models/Journal");
const { Text } = require("../models/Text");
const { sequelize, Sequelize } = require("./db");

User.hasMany(Journal);
Journal.belongsTo(User, { foreignKey: "ownerId" });
Journal.hasMany(Text);
Text.belongsTo(Journal);
User.hasMany(Text);
Text.belongsTo(User, { foreignKey: "ownerId" });

module.exports = {
  User,
  Journal,
  Text,
  sequelize,
  Sequelize,
};
