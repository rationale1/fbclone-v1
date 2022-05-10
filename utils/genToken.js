const { sign } = require("jsonwebtoken"),
  { JWT_SECRET } = require("../config/keys");

const genToken = id => {
  return sign({ id }, JWT_SECRET, { expiresIn: "30d" });
};

module.exports = genToken;
