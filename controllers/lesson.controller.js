const courseModel = require("../models/course.model")
const lessonsModel = require("../models/lessons.model")
const {cloudinaryUpload} = require('../helpers/cloudinary')

const createLesson = async (request, response) => {
    try {
        const courseId = request.query.courseId
        const {title, description} = request.fields
        const photo = request.files.file
        const course = await courseModel.findById(courseId)
        if(!course){
            return response.status(400).json({
                success: false,
                message: "No such course exists"
            })
        }
        const lesson = new lessonsModel({
            title: title,
            description: description,
            image: photo
        })
        if(photo){
            await cloudinaryUpload(photo.path)
                .then((downloadURL) => {
                    lesson.image = downloadURL
                })
                .catch((err) => {
                    return response.status(400).json({message: err.message})
                })
        }
        await lesson.save()
        await course.lessons.push(lesson._id)
        await course.save()
        return response.status(201).json({
            success: true,
            message: "Lesson created successfully",
            Data: lesson
        })
    }
    catch (err) {
        return response.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const getLessons = async (request, response) => {
    try {
        const lessons = await lessonsModel.find()
        return response.status(200).json({
            success: true,
            message: "Data retrieved successfully",
            Data: lessons,
        })
    }
    catch (err) {
        return response.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const deleteLesson = async (request, response) => {
    try {
        const lessonId = request.query.lessonId
        await lessonsModel.findByIdAndDelete(lessonId)
        return response.status(200).json({
            success: true,
            message: "Deleted successfully"
        })
    }
    catch (err) {
        return response.status(500).json({
            success: false,
            message: err.message
        })
    }
}

module.exports = {
    createLesson, getLessons, deleteLesson
}