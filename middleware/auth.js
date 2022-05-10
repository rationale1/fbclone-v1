const { verify } = require("jsonwebtoken");

exports.protect = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];

      const decode = verify(token, "secret");

      req.user = decode;

      req.userId = decode?.id;

      next();
    } else return res.status(401).json({ message: "Unauthorized, no token" });
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

exports.auth = (req, res, next) => {
  const token = req.header("x-auth-token");

  // Check for token
  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });

  try {
    // Verify token
    const decoded = verify(token, "secret");

    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};
