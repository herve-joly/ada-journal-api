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
    return;
  }

  const [type, token] = header.split(" ");
  if (type.toLowerCase() !== "bearer" || !token) {
    console.error("Invalid token.");
    res.sendStatus(401);
    return;
  }
  try {
    const user = JWT.verify(token, JWT_SECRET);
    req.user = user;
    const tempUser = await User.findByPk(req.params.userid);
    const requestedUserName = tempUser.username;
    if (user.userName !== requestedUserName) {
      console.error("problem");
      res.sendStatus(401);
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = authMiddleware;
