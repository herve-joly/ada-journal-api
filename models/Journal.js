const { Sequelize, sequelize } = require("../db/db");

const Journal = sequelize.define("Journal", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = { Journal };
