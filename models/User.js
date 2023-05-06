const { Sequelize, sequelize } = require("../db/db");

const User = sequelize.define("User", {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = { User };
