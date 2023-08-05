const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    note: {
      type: String,
      required: true,
    },
    student: {
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

module.exports = mongoose.model("Note", noteSchema);
