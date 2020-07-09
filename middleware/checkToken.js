const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  // get token from header
  const token = req.headers["x-auth-token"];

  // check if no token
  if (!token) {
    return res.status(401).send("Authorization Denied.");
  }

  // verify token
  try {
    const decoded = jwt.verify(token, config.get("PrivateKey"));
    next();
  } catch (error) {
    res.status(500).send("Internal server error.\n" + error.message);
  }
};
