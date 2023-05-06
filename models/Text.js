const { Sequelize, sequelize } = require("../db/db");

const Text = sequelize.define("Text", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  text: {
    type: Sequelize.STRING,
  },
});

module.exports = { Text };
