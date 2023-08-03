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