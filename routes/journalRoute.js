const express = require("express");
const router = express.Router();
const { Journal } = require("../models/Journal");

router.get("/user/:userid/journals", async (req, res, next) => {
  try {
    const journals = await Journal.findAll({
      where: { UserId: req.params.userid },
    });
    res.send(journals);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/user/:userid/journals", async (req, res, next) => {
  // if (!req.user) {
  //   res.sendStatus(401);
  //   return;
  // }
  const journal = await Journal.create({
    title: req.body.title,
    UserId: req.params.userid,
  });
  res.status(201).send({
    title: journal.title,
    UserId: journal.UserId,
  });
});

router.put("/user/:userid/journals/:journalid", async (req, res, next) => {
  try {
    const { title } = req.body;
    const entry = await Journal.findByPk(req.params.journalid);
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

router.delete("/user/:userid/journals/:journalid", async (req, res, next) => {
  const journal = await Journal.findByPk(req.params.journalid);
  if (!journal) {
    res.sendStatus(404);
    return;
  }
  // if (journal.UserId !== req.user.id) {
  //   res.sendStatus(403);
  //   return;
  // }
  await journal.destroy();
  res.send("Deleted");
});

module.exports = router;
