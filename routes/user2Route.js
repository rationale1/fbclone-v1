const router = require("express").Router(),
  User = require("../models/user2Model"),
  { sign } = require("jsonwebtoken");

// Register Route
router.post("/register", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    //   Simple Validation
    if (!name || !email || !password)
      return res.status(400).json({ message: "Please Enter All Fields" });

    //   Check If User Exist
    const userExists = await User.findOne({ email });

    if (userExists)
      return res.status(400).json({ message: "User Already exists..." });
    else {
      const user = await User.create({ name, email, password });

      if (user) {
        const { _id, name, email, createdAt } = user;

        res.status(201).json({
          _id,
          name,
          email,
          createdAt,
          token: genToken(user.id),
        });
      }
    }
  } catch (error) {
    next(error);
  }
});

// Login Route
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //   Simple Validation
    if (!email || !password)
      return res.status(400).json({ message: "Please Enter All Fields" });

    //   Check If User Exist
    const user = await User.findOne({ email });

    if (user && (await user.isValidPass(password))) {
      res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        token: genToken(user.id),
      });
    } else {
      res.status(400).json({ message: "Invalid Email or Password" });
    }
  } catch (error) {
    next(error);
  }
});

const genToken = id => {
  return sign({ id }, "secret", { expiresIn: "1h" });
};

// Export Module
module.exports = router;
