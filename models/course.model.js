const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    prerequisites: {
      type: String,
      required: true,
    },
    learningObjectives: {
      type: String,
      required: true,
    },
    lessons: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Lessons",
      },
    ],
    students: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
