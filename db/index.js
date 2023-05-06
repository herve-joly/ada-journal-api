const { User } = require("../models");
const { sequelize, Sequelize } = require("./db");

module.exports = {
  User,
  sequelize,
  Sequelize,
};
