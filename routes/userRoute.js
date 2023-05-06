const express = require("express");
const router = express.Router();
const { User } = require("../models/User");

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/user", async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.create({ username, password });
  res.status(201).send({
    username: user.username,
    password: user.password,
  });
});

module.exports = router;