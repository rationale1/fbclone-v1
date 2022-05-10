const { Schema, model } = require("mongoose");

const NoteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      max: 200,
    },

    content: {
      type: String,
      required: true,
      minlength: 3,
      max: 200,
    },

    category: {
      type: String,
      required: true,
      minlength: 3,
      max: 200,
    },

    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true },
);

module.exports = model("note", NoteSchema);
