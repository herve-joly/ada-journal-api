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
    res.send("<h1>Welcome to the API</h1>");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.use("/users", Userroute);
app.use("/journals", Journalroute);
app.use("/texts", Textroute);

module.exports = app;
