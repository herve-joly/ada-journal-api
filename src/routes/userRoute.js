const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const bcrypt = require("bcrypt");
require("dotenv").config(".env");
const JWT = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const authMiddleware = require("../controler/authMiddleware");

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const matches = await bcrypt.compare(password, user.password);
    // Generate a JWT token
    if (matches) {
      const token = JWT.sign(
        { userName: user.username, userId: user.id },
        JWT_SECRET,
        {
          expiresIn: "1h", // Token expiration time
        }
      );
      res.send(token);
    }

    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/:userid", authMiddleware, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userid);
    res.send(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const search = await User.findOne({
      where: { username: req.body.username },
    });
    if (search) {
      res.sendStatus(400);
    }
    const SALT_LENGTH = 10;
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, SALT_LENGTH);
    await User.create({ username, password: hashedPassword });
    res.send("Success!");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.use((error, req, res, next) => {
  console.error("SERVER ERROR: ", error);
  if (res.statusCode < 400) res.status(500);
  res.send({ error: error.message, name: error.name, message: error.message });
});

module.exports = router;
