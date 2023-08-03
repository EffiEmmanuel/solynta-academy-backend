const mongoose = require('mongoose')

const classSchema = new mongoose.Schema({
    className: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teacher',
        required: true
    },
    student: [
        {
            studentId: {
                type: String,
                ref: 'student'
            }
        }
    ]
}, {timestamps: true})


module.exports = mongoose.model("Class", classSchema)