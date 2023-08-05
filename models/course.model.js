<<<<<<< HEAD
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
=======
const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    lessons: [
        {
            lessonId: {
                type:  mongoose.Types.ObjectId
            }
        }
    ]
}, {timestamps: true})

module.exports = mongoose.model("Course", courseSchema)
>>>>>>> 02cbd1d006f56b4071817f1ffc0daf4cf15632f1
