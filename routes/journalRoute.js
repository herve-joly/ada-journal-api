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

router.put("/journal/:id", async (req, res, next) => {
  try {
    const { title } = req.body;
    const entry = await Journal.findByPk(req.params.id);
    if (!entry) {
      return res.status(404).send({ message: "Journal not found" });
    }
    entry.title = title;
    await entry.save();
    res.status(200).send({
      title: entry.title,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
