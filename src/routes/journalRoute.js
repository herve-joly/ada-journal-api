const express = require("express");
const authMiddleware = require("../controler/authMiddleware");
const router = express.Router();
const { Journal } = require("../models/Journal");

router.use("/user/:userid/", authMiddleware);

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
  try {
    const journal = await Journal.create({
      title: req.body.title,
      UserId: req.params.userid,
    });
    res.send({
      title: journal.title,
      UserId: journal.UserId,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
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
  await journal.destroy();
  res.send("Deleted");
});

router.use((error, req, res, next) => {
  console.error("SERVER ERROR: ", error);
  if (res.statusCode < 400) res.status(500);
  res.send({ error: error.message, name: error.name, message: error.message });
});

module.exports = router;
