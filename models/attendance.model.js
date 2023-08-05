<<<<<<< HEAD
const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Student",
    },
    time: {
      type: Date,
    },
    isPresent: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attendance", attendanceSchema);
=======
const mongoose = require("mongoose")

const attendanceSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Students"
    },
    time: {
        type: Date,
    }
}, {timestamps: true})

module.exports = mongoose.model("Attendance", attendanceSchema)
>>>>>>> 02cbd1d006f56b4071817f1ffc0daf4cf15632f1
