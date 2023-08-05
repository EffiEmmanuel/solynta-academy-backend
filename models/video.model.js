const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "teacher",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Video", videoSchema);
