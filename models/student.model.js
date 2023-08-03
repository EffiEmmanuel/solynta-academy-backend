const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,
    },
    emailAddress: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    academicYear: {
        type: String,
    },
    role: {
        type: String,
        default: "Student"
    },
    parentId: {
        type: String,
        ref: "Parent"
    }
}, {timestamps: true})

module.exports = mongoose.model("Student", studentSchema)