const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
    },
    deadline: {
      type: Date,
    },
    student: {
      type: mongoose.Types.ObjectId,
      ref: "Student",
    },
    feedback: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Assignment", assignmentSchema);
