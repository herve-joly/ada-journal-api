const express = require("express");
const router = express.Router();
const { Text } = require("../models/Text");
const authMiddleware = require("../controler/authMiddleware");

router.use("/user/:userid/", authMiddleware);

router.get(
  "/user/:userid/journals/:journalid/texts",
  async (req, res, next) => {
    try {
      const texts = await Text.findAll();
      res.send(texts);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.get(
  "/user/:userid/journals/:journalid/texts/:id",
  async (req, res, next) => {
    try {
      const texts = await Text.findByPk(req.params.id);
      res.send(texts);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.post(
  "/user/:userid/journals/:journalid/texts",
  async (req, res, next) => {
    const UserId = req.params.userid;
    const JournalId = req.params.journalid;
    const { title, text } = req.body;
    const entry = await Text.create({ title, text, UserId, JournalId });
    res.status(201).send({
      title: entry.title,
      text: entry.entry,
      UserId: entry.UserId,
      JournalId: entry.JournalId,
    });
  }
);

router.put(
  "/user/:userid/journals/:journalid/texts/:id",
  async (req, res, next) => {
    try {
      const { title, text } = req.body;
      const entry = await Text.findByPk(req.params.id);
      if (!entry) {
        return res.status(404).send({ message: "Text entry not found" });
      }
      entry.title = title;
      entry.text = text;
      await entry.save();
      res.status(200).send({
        title: entry.title,
        text: entry.text,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/user/:userid/journals/:journalid/texts/:id",
  async (req, res, next) => {
    const text = await Text.findByPk(req.params.id);
    if (!text) {
      res.sendStatus(404);
      return;
    }
    await text.destroy();
    res.send("Deleted");
  }
);

router.use((error, req, res, next) => {
  console.error("SERVER ERROR: ", error);
  if (res.statusCode < 400) res.status(500);
  res.send({ error: error.message, name: error.name, message: error.message });
});

module.exports = router;
