const { Schema, model } = require("mongoose");

const PostSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    desc: {
      type: String,
      max: 500,
    },

    img: {
      type: String,
      default: "",
    },

    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true },
);

module.exports = model("post", PostSchema);
