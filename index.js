const express = require("express");
const Userroute = require("./routes/userRoute");
const Journalroute = require("./routes/journalRoute");
const Textroute = require("./routes/textRoute");

const app = express();

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

module.exports = app;
