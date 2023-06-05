require("dotenv").config(".env");
const { User } = require("../models/User");
const JWT = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

async function authMiddleware(req, res, next) {
  const header = req.get("Authorization");

  if (!header) {
    console.log("header");
    console.error("Missing Authorization header.");
    res.set("WWW-Authenticate", "Bearer");
    res.sendStatus(401);
  }
  next();
  const [type, token] = header.split(" ");
  if (type.toLowerCase() !== "bearer" || !token) {
    console.error("Invalid token.");
    res.sendStatus(401);
    return;
  }
  try {
    console.log(token);
    const user = JWT.verify(token, JWT_SECRET);
    req.user = user;
    const tempUser = await User.findByPk(req.params.userid);
    const requestedUserName = tempUser.username;
    console.log(requestedUserName);
    console.log(user.userName);
    if (user.username !== requestedUserName) {
      console.log("problem");
      res.sendStatus(401);
      return;
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = authMiddleware;
