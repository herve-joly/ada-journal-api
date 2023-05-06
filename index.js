const express = require("express");

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

app.get("/users", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.get("/journals", async (req, res, next) => {
  try {
    const journals = await Journal.findAll();
    res.send(journals);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.get("/texts", async (req, res, next) => {
  try {
    const journals = await Text.findAll();
    res.send(texts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = app;
