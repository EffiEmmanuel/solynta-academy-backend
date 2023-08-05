const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    emailAddress: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    classes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Class",
      },
    ],
    higherEducation: {
      type: String,
    },
    subjectSpecialism: {
      type: String,
    },
    experienceSince: {
      type: String,
    },
    role: {
      type: String,
      default: "Teacher",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Teacher", teacherSchema);
