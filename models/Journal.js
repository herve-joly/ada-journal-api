const { userInfo } = require("os");
const { Sequelize, sequelize, User } = require("../db/db");

const Journal = sequelize.define("Journal", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = { Journal };
