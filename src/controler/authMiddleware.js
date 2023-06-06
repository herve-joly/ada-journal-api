require("dotenv").config(".env");
const { User } = require("../models/User");
const JWT = require("jsonwebtoken");
const { Admin } = require("../models/Admin");
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
    const authToken = JWT.verify(token, JWT_SECRET);

    const tempUser = await User.findByPk(req.params.userid);
    const requestedUserName = tempUser.username;
    if (authToken.role === "admin") {
      const admin = await Admin.findByPk(authToken.userId);

      if (!admin) {
        console.error("Not an admin");
        res.sendStatus(401);
        return;
      }

      if (!admin && authToken.userName !== requestedUserName) {
        console.error("problem");
        res.sendStatus(401);
        return;
      }
    }
    req.user = authToken;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = authMiddleware;
