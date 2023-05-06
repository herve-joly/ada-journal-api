const express = require("express");
const router = express.Router();
const { Journal } = require("../models/Journal");

router.get("/", async (req, res, next) => {
  try {
    const journals = await Journal.findAll();
    res.send(journals);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/journal", async (req, res, next) => {
  // if (!req.user) {
  //   res.sendStatus(401);
  //   return;
  // }
  // const UserId = req.user.id;
  const { title, UserId } = req.body;
  const journal = await Journal.create({ title, UserId });
  res.status(201).send({
    title: journal.title,
    ownerId: journal.UserId,
  });
});

module.exports = router;
