const { sign, verify } = require("jsonwebtoken"),
  { JWT_SECRET, JWT_EXPIRE } = require("../config/keys"),
  createError = require("http-errors");

const signAccessToken = user => {
  return new Promise((resolve, reject) => {
    const payload = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };

    sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRE }, (err, token) => {
      if (err) reject(err);
      else resolve(token);
    });
  });
};

const auth = (req, res, next) => {
  const token = req.headers["x-auth-token"];

  if (!token) return next(createError.Unauthorized());

  verify(token, JWT_SECRET, (err, payload) => {
    if (err) return next(createError.Unauthorized());
    else {
      req.user = payload;

      next();
    }
  });
};

module.exports = {
  signAccessToken,
  auth,
};
