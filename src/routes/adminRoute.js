const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { Journal } = require("../models/Journal");
const bcrypt = require("bcrypt");
require("dotenv").config(".env");
const JWT = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const adminAuthMiddleware = require("../controler/adminAuthMiddleware");
const { Admin } = require("../models/Admin");

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ where: { username } });
    if (!admin) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const matches = await bcrypt.compare(password, admin.password);
    // Generate a JWT token
    if (matches) {
      const token = JWT.sign(
        { userName: admin.username, userId: admin.id, role: admin.role },
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

router.get("/users", adminAuthMiddleware, async (req, res, next) => {
  try {
    const user = await User.findAll();
    res.send(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/:userid", adminAuthMiddleware, async (req, res, next) => {
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
    const search = await Admin.findOne({
      where: { username: req.body.username },
    });
    if (search) {
      res.sendStatus(400);
    }
    const SALT_LENGTH = 10;
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, SALT_LENGTH);
    await Admin.create({ username, password: hashedPassword, role: "admin" });
    res.send("Success!");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/journals", adminAuthMiddleware, async (req, res, next) => {
  try {
    const journals = await Journal.findAll();
    res.send(journals);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//DELETE routes
router.delete("/:userid", adminAuthMiddleware, async (req, res, next) => {
  const user = await User.findByPk(req.params.userid);
  await user.destroy();
  res.send("Deleted");
});

router.use((error, req, res, next) => {
  console.error("SERVER ERROR: ", error);
  if (res.statusCode < 400) res.status(500);
  res.send({ error: error.message, name: error.name, message: error.message });
});

module.exports = router;
