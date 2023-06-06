const { Sequelize, sequelize } = require("../db/db");

const Admin = sequelize.define("Admin", {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = { Admin };
