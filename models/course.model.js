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