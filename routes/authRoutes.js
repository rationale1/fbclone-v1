const router = require("express").Router(),
  User = require("../models/authModel"),
  upload = require("../middleware/upload"),
  { sign } = require("jsonwebtoken");

// Register Route
router.post("/register", upload.single("profPic"), async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    //   Simple Validation
    if (!username || !email || !password)
      return res.status(400).json({ message: "Please Enter All Fields" });

    //   Check If User Exist
    const userExists = await User.findOne({ email });

    if (userExists)
      return res.status(400).json({ message: "User Already exists..." });
    else {
      const user = new User({ username, email, password });

      if (req.file) user.profPic = req.file.filename;
      else return res.status(400).json("Please Upload an image");

      await user.save();

      if (user) {
        const { _id, username, email, createdAt, profPic } = user;

        res.status(201).json({
          _id,
          username,
          email,
          profPic,
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
        username: user.username,
        email: user.email,
        profPic: user.profPic,
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
  // return sign({ id }, "secret", { expiresIn: "120s" });
};

// Export Module
module.exports = router;
