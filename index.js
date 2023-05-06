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
module.exports = app;
