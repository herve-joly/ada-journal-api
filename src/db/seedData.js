const bcrypt = require("bcrypt");
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

const Journal = sequelize.define("Journal", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const Text = sequelize.define("Text", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  text: {
    type: Sequelize.STRING,
  },
});

// Define relationships
User.hasMany(Journal);
Journal.belongsTo(User);

Journal.hasMany(Text);
Text.belongsTo(Journal);

User.hasMany(Text);
Text.belongsTo(User);

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

module.exports = { User, Journal, Text, Admin };

// Generate seed data
const seedData = async () => {
  await sequelize.sync({ force: true });

  try {
    // Create 10 users
    const users = [];
    for (let i = 1; i <= 10; i++) {
      const username = `user${i}`;
      const password = `password${i}`;
      const hashedPassword = await bcrypt.hash(password, 10);

      users.push({
        username,
        password: hashedPassword,
      });
    }
    await User.bulkCreate(users);

    // Create 10 journals per user
    const journals = [];
    const texts = [];

    for (let i = 1; i <= 10; i++) {
      for (let j = 1; j <= 10; j++) {
        journals.push({
          title: `Journal ${i}`,
          UserId: i,
        });

        texts.push({
          title: `Text ${j}`,
          text: `This is the content of Text ${j}`,
          UserId: i,
          JournalId: i,
        });
      }
    }

    await Journal.bulkCreate(journals);
    await Text.bulkCreate(texts);

    // Create admin
    const adminUsername = "admin";
    const adminPassword = "adminpassword";
    const hashedAdminPassword = await bcrypt.hash(adminPassword, 10);

    await Admin.create({
      username: adminUsername,
      password: hashedAdminPassword,
      role: "admin",
    });

    console.log("Seed data created successfully!");
  } catch (error) {
    console.error("Error creating seed data:", error);
  } finally {
    process.exit();
  }
};

seedData();
