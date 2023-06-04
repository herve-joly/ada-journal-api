require("dotenv").config();
const express = require("express");
const Userroute = require("./routes/userRoute");
const Journalroute = require("./routes/journalRoute");
const Textroute = require("./routes/textRoute");
const morgan = require("morgan");
const bcrypt = require("bcrypt");
const { User } = require("./db");
const SALT_COUNT = 10;

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res, next) => {
  try {
    res.send("Welcome! \nPlease login");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    const user = await User.create({ username, password: hashedPassword });
    res.send("success");
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
