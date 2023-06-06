require("dotenv").config(".env");
const { Admin } = require("../models/Admin");
const JWT = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

async function adminAuthMiddleware(req, res, next) {
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
    const admin = JWT.verify(token, JWT_SECRET);
    req.user = admin;
    if (admin.role !== "admin") {
      console.error("problem");
      res.sendStatus(401);
      return;
    }
    req.user = admin;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = adminAuthMiddleware;
