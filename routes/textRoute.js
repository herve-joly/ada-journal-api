const express = require("express");
const router = express.Router();
const { Text } = require("../models/Text");

router.get("/", async (req, res, next) => {
  try {
    const texts = await Text.findAll();
    res.send(texts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/text", async (req, res, next) => {
  // if (!req.user) {
  //   res.sendStatus(401);
  //   return;
  // }
  // const UserId = req.user.id;
  // const JournalId = req.user.id;
  const { title, text, UserId, JournalId } = req.body;
  const entry = await Text.create({ title, text, UserId, JournalId });
  res.status(201).send({
    title: entry.title,
    text: entry.entry,
    ownerId: entry.UserId,
    journalId: entry.JournalId,
  });
});

module.exports = router;
