const { User } = require("../models/User");
const { Journal } = require("../models/Journal");
const { Text } = require("../models/Text");
const { Admin } = require("../models/Admin");
const { sequelize, Sequelize } = require("./db");

User.hasMany(Journal);
Journal.belongsTo(User);
Journal.hasMany(Text);
Text.belongsTo(Journal);
User.hasMany(Text);
Text.belongsTo(User);

module.exports = {
  User,
  Journal,
  Text,
  Admin,
  sequelize,
  Sequelize,
};
