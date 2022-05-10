const User = require("../models/userModel"),
  asyncHandler = require("express-async-handler"),
  genToken = require("../utils/genToken");

exports.registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, pic } = req.body;
  try {
    const userExists = await User.findOne({ email });

    if (userExists)
      return res.status(400).json({ err: "User Already Registered" });

    const user = await User.create({ name, email, password, pic });

    if (user)
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        isAdmin: user.isAdmin,
        token: genToken(user._id),
      });
  } catch (error) {
    next(error);
  }
});

// login User
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.status(200).json({ user, token: genToken(user._id) });
    } else res.status(400).json({ err: "Invalid Email or Password" });
  } catch (error) {
    next(error);
  }
});
