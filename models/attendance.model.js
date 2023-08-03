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