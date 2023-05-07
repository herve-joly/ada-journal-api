const express = require("express");
const Userroute = require("./routes/userRoute");
const Journalroute = require("./routes/journalRoute");
const Textroute = require("./routes/textRoute");
const morgan = require("morgan");
const { Journal, Text, User } = require("./db/index");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res, next) => {
  try {
    res.send("<h1>Welcome to the API</p>");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.use("/api/users", Userroute);
app.use("/api/journals", Journalroute);
app.use("/api/texts", Textroute);

//DELETE routes
app.delete("/users/:id", async (req, res, next) => {
  const user = await User.findByPk(req.params.id);
  // if (!user) {
  //   res.sendStatus(404);
  //   return;
  // }
  await user.destroy();
  res.send("Deleted");
});

app.delete("/texts/text/:id", async (req, res, next) => {
  const text = await Text.findByPk(req.params.id);
  if (!text) {
    res.sendStatus(404);
    return;
  }
  // if (text.UserId !== req.user.id) {
  //   res.sendStatus(403);
  //   return;
  // }
  await text.destroy();
  res.send("Deleted");
});

app.delete("/journals/journal/:id", async (req, res, next) => {
  const journal = await Journal.findByPk(req.params.id);
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

module.exports = app;
