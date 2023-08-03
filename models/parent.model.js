const mongoose = require('mongoose')

const parentSchema = new mongoose.Schema({
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
    phoneNumber: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "Parent"
    },
    student: [
        {
            studentId: {
                type: String,
                ref: 'Student'
            }
        }
    ]
}, {timestamps: true})

module.exports = mongoose.model("Parent", parentSchema)