const express = require("express");
const router = express.Router();
const { User } = require("../models/User");

router.get("/:userid", async (req, res, next) => {
  console.log("Hello");
  try {
    const user = await User.findByPk({ where: { userid: req.params.userid } });
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
    const { username, password } = req.body;
    const user = await User.create({ username, password });
    res.status(201).send({
      username: user.username,
      password: user.password,
    });
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

module.exports = router;
