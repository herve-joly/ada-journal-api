require("dotenv").config();
const express = require("express");
const Userroute = require("./routes/userRoute");
const Journalroute = require("./routes/journalRoute");
const Textroute = require("./routes/textRoute");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  const header = req.get("Authorization");

  if (!header) {
    console.error("Missing Authorization header.");
    res.set("WWW-Authenticate", "Bearer");
    res.sendStatus(401);
    return;
  }

  const [type, token] = header.split(" ");

  if (type.toLowerCase() !== "bearer" || !token) {
    console.error("Invalid token.");
    res.sendStatus(401);
    return;
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(401);
  }
});

app.get("/", async (req, res, next) => {
  try {
    res.send("Welcome! \nPlease login");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.get("/register", async (req, res, next) => {
  try {
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
