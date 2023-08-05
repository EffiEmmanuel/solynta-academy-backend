const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
  {
    className: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "teacher",
      required: true,
    },
    student: [
      {
        type: mongoose.Types.ObjectId,
        ref: "student",
      },
    ],
    assignments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "assignment",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Class", classSchema);
