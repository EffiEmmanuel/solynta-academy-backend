<<<<<<< HEAD
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
=======
const mongoose = require("mongoose")

const assignmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    score: {
        type: Number,
    },
    deadline: {
        type: Date,
    }
}, {timestamps: true})

module.exports = mongoose.model("Assignment", assignmentSchema)
>>>>>>> 02cbd1d006f56b4071817f1ffc0daf4cf15632f1
