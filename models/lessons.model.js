<<<<<<< HEAD
const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    instructor: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lessons", lessonSchema);
=======
const mongoose = require("mongoose")

const lessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
    }
}, {timestamps: true})

module.exports = mongoose.model("Lessons", lessonSchema)
>>>>>>> 02cbd1d006f56b4071817f1ffc0daf4cf15632f1
