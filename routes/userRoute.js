const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) return;
    const matches = await bcrypt.compare(password, user.password);
    res.send(matches ? "Login" : "Failed");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/:userid", async (req, res, next) => {
  console.log("Hello");
  try {
    const user = await User.findByPk(req.params.userid);
    res.send(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/", async (req, res, next) => {
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

//DELETE routes
router.delete("/:userid", async (req, res, next) => {
  const user = await User.findByPk(req.params.userid);
  // if (!user) {
  //   res.sendStatus(404);
  //   return;
  // }
  await user.destroy();
  res.send("Deleted");
});

router.use((error, req, res, next) => {
  console.error("SERVER ERROR: ", error);
  if (res.statusCode < 400) res.status(500);
  res.send({ error: error.message, name: error.name, message: error.message });
});

module.exports = router;
