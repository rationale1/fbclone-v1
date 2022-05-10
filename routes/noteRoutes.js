const router = require("express").Router(),
  Notes = require("../models/noteModel"),
  { protect } = require("../middleware/auth");

//   Get All Notes
router.get("/", protect, async (req, res, next) => {
  try {
    const notes = await Notes.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
});

//   Post a New Note
router.post("/", protect, async (req, res, next) => {
  try {
    const { title, content, category } = req.body;

    if (!title || !content || !category)
      return res.status(400).json({ message: "Please Fill all the field" });

    const note = new Notes({ user: req.user.id, title, content, category });

    await note.save();

    res.status(201).json(note);
  } catch (error) {
    next(error);
  }
});

//   Get a Note
router.get("/:id", protect, async (req, res, next) => {
  try {
    const { id } = req.params;

    const note = await Notes.findById(id);

    if (note) return res.status(200).json(note);
    else return res.status(404).json({ message: "Note Not found" });
  } catch (error) {
    next(error);
  }
});

//   Delete a Note
router.delete("/:id", protect, async (req, res, next) => {
  try {
    const { id } = req.params;

    const note = await Notes.findById(id);

    if (note.user.toString() !== req.user.id.toString())
      return res.status(401).json({ message: "You can't perform this action" });

    if (note) {
      await note.remove();

      return res.status(200).json({ message: "Note Removed Successfully" });
    } else return res.status(404).json({ message: "Note Not found" });
  } catch (error) {
    next(error);
  }
});

//   Put Request
router.put("/:id", protect, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content, category } = req.body;

    const note = await Notes.findById(id);

    if (note.user.toString() !== req.user.id.toString())
      return res.status(401).json({ message: "You can't perform this action" });

    if (note) {
      if (title) note.title = title;
      if (content) note.content = content;
      if (category) note.category = category;

      const updatedNote = await note.save();

      res.status(201).json(updatedNote);
    } else return res.status(404).json({ message: "Note Not found" });
  } catch (error) {
    next(error);
  }
});

// Export module
module.exports = router;

// 15:13
