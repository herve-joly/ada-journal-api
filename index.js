const express = require("express");
const Userroute = require("./routes/userRoute");
const Journalroute = require("./routes/journalRoute");
const Textroute = require("./routes/textRoute");
const morgan = require("morgan");

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

app.use((error, req, res, next) => {
  console.error("SERVER ERROR: ", error);
  if (res.statusCode < 400) res.status(500);
  res.send({ error: error.message, name: error.name, message: error.message });
});

module.exports = app;
