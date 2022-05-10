const router = require("express").Router(),
  Posts = require("../models/postModel"),
  Users = require("../models/authModel"),
  upload = require("../middleware/upload"),
  { protect } = require("../middleware/auth");

// Create a Post
router.post("/", protect, upload.single("img"), async (req, res, next) => {
  try {
    const post = new Posts({ ...req.body, userId: req.userId });

    if (req.file) post.img = req.file.filename;
    else return res.status(400).json({ message: "Please Upload an image" });

    await post.save();

    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
});

// Update a post
router.put("/:id", protect, async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await Posts.findById(id);

    if (post.userId === req.userId) {
      await Posts.findByIdAndUpdate(
        id,
        { $set: req.body },
        { runValidators: true, new: true },
      );

      res.status(200).json({ message: "Post Updated", post });
    } else
      return res.status(403).json({ message: "You can update only your post" });
  } catch (error) {
    next(error);
  }
});

// Delete a post
router.delete("/:id", protect, async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await Posts.findById(id);

    if (post.userId === req.userId) {
      await post.deleteOne({});

      res.status(200).json("Post Deleted Successfully");
    } else
      return res.status(403).json({ message: "You can delete only your post" });
  } catch (error) {
    next(error);
  }
});

// like and unlike a post
router.patch("/:id/like", protect, async (req, res, next) => {
  try {
    const { id } = req.params;
    // const { userId } = req.body;
    const userId = req.userId;

    const post = await Posts.findById(id);

    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });

      res.status(200).json({ message: "post has been liked" });
    } else {
      await post.updateOne({ $pull: { likes: userId } });

      res.status(200).json({ message: "post has been unliked" });
    }
  } catch (error) {
    next(error);
  }
});

// get a post
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Posts.findById(id);

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
});

// get timeline posts
router.get("/timeline/all", protect, async (req, res, next) => {
  try {
    // const { userId } = req.params;
    const userId = req.userId;

    const currentUser = await Users.findById(userId).sort({ createdAt: -1 });
    const userPosts = await Posts.find({ userId: currentUser.id });

    const friendPosts = await Promise.all(
      currentUser.followings.map(id =>
        Posts.find({ userId: id }).sort({ createdAt: -1 }),
      ),
    );

    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (error) {
    next(error);
  }
});

// Get User's All Post
router.get("/profile/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await Posts.find({ userId: id });

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
