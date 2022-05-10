const router = require("express").Router(),
  User = require("../models/authModel"),
  { protect } = require("../middleware/auth"),
  { genSalt, hash } = require("bcryptjs");

// update user
router.put("/:id", protect, async (req, res, next) => {
  try {
    const { id } = req.params;
    let { password, username, email } = req.body;
    const user = await User.findById(req.userId);

    if (user.id === req.userId && user.isAdmin === false) {
      const updatedUser = {};

      if (password) {
        const salt = await genSalt(10);
        hashedPassword = await hash(password, salt);

        updatedUser.password = hashedPassword;
      }

      if (username) updatedUser.username = username;
      if (email) updatedUser.email = email;

      const edited = await User.findByIdAndUpdate(
        id,
        { $set: { ...updatedUser, ...req.body } },
        { runValidators: true, new: true },
      );

      res.status(200).json({ message: "Account has been updated", edited });
    } else {
      res.status(403).json({ message: "You can update only your account" });
    }
  } catch (error) {
    next(error);
  }
});

// Delete User
router.delete("/:id", protect, async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) return res.status(404).json({ message: "user not found" });

    if (user.id === req.userId && user.isAdmin === false) {
      await user.deleteOne({});

      res.status(200).json({ message: "User Deleted Successfully" });
    } else {
      res.status(403).json({ message: "You can Delete only your account" });
    }
  } catch (error) {
    next(error);
  }
});

// Get A User
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) return res.status(404).json({ message: "User Not found" });
    else {
      const { password, updatedAt, ...others } = user._doc;

      return res.status(200).json(others);
    }
  } catch (error) {
    next(error);
  }
});

// Get All Users
router.get("/", async (req, res, next) => {
  try {
    const user = await User.find().sort("-password");

    if (!user) return res.status(404).json({ message: "User Not found" });
    else {
      // const { password, updatedAt, ...others } = user._doc;

      // return res.status(200).json(others);
      res.status(200).json(user);
    }
  } catch (error) {
    next(error);
  }
});

// Get Friends
router.get("/friends/list", protect, async (req, res, next) => {
  // const { userId } = req.params;
  const userId = String(req.userId);
  try {
    const user = await User.findById(userId);

    const friends = await Promise.all(
      user.followings.map(friendId => User.findById(friendId)),
    );

    const friendsList = friends.map(({ _id, username, profPic }) => ({
      _id,
      username,
      profPic,
    }));

    res.status(200).json(friendsList);
  } catch (error) {
    next(error);
  }
});

// Follow a user
router.patch("/:id/follow", protect, async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    if (userId !== id) {
      const user = await User.findById(id);

      const currentUser = await User.findById(userId);

      if (!user.followers.includes(userId)) {
        await user.updateOne({ $push: { followers: userId } });

        await currentUser.updateOne({ $push: { followings: user.id } });

        res.status(200).json({ message: "user has been followed" });
      } else {
        res.status(403).json({ message: "You already follow this user" });
      }
    } else {
      res.status(403).json({ message: "You can't follow yourself" });
    }
  } catch (error) {
    next(error);
  }
});

// Unfollow user
router.patch("/:id/unfollow", protect, async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    if (userId !== id) {
      const user = await User.findById(id);

      const currentUser = await User.findById(userId);

      if (user.followers.includes(userId)) {
        await user.updateOne({ $pull: { followers: userId } });

        await currentUser.updateOne({ $pull: { followings: userId } });

        res.status(200).json({ message: "user has been unfollowed" });
      } else {
        res.status(403).json({ message: "You don't follow this user" });
      }
    } else {
      res.status(403).json({ message: "You can't unfollow yourself" });
    }
  } catch (error) {
    next(error);
  }
});

// Export Module
module.exports = router;
