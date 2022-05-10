const Posts = require("../models/postMessage"),
  upload = require("../middleware/upload");

// Get All Posts
exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Posts.find();

    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

// Create Post
exports.createPost = async (req, res, next) => {
  try {
    const post = await Posts.create(req.body);

    if (post) return res.status(201).json(post);
    else
      return res.status(400).json({ message: "Post Created Unsuccessfully" });
  } catch (error) {
    next(error);
  }
};

// Update Post
exports.updatePost = async (req, res, next) => {
  try {
    const { id } = req.params,
      { post } = req.body;

    const updatePost = await Posts.findByIdAndUpdate(id, post, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(updatePost);
  } catch (error) {
    next(error);
  }
};
