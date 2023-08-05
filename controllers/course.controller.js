<<<<<<< HEAD
const { response } = require("express");
const Course = require("../models/course.model");

const createCourse = async (request, response) => {
  try {
    const { title } = request.body;
    const course = new Course({
      title: title,
    });
    await course.save();
    return response.status(201).json({
      success: true,
      message: "Course created successfully",
      Data: course,
    });
  } catch (err) {
    return response.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getAllCourses = async (request, response) => {
  try {
    const courses = await Course.find();
    return response.status(200).json({
      success: true,
      message: "Data retrieved successfully",
      Data: courses,
    });
  } catch (err) {
    return response.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteCourse = async (request, response) => {
  try {
    const courseId = request.query.courseId;
    await Course.findByIdAndDelete(courseId);

    return response.status(200).json({
      success: true,
      message: "data deleted successfully",
    });
  } catch (err) {
    return response.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  deleteCourse,
};
=======
const { response } = require('express')
const Course = require('../models/course.model')

const createCourse = async(request, response) => {
    try{
        const {title} = request.body
        const course = new Course({
            title: title
        })
        await course.save()
        return response.status(201).json({
            success: true,
            message: "Course created successfully",
            Data: course
        })
    }
    catch (err) {
        return response.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const getAllCourses = async (request, response) => {
    try {
        const courses = await Course.find()
        return response.status(200).json({
            success: true,
            message: "Data retrieved successfully",
            Data: courses
        })
    }
    catch (err) {
        return response.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const deleteCourse = async (request, response) => {
    try {
        const courseId = request.query.courseId
        await Course.findByIdAndDelete(courseId)

        return response.status(200).json({
            success: true,
            message: "data deleted successfully"
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
    createCourse, getAllCourses, deleteCourse
}
>>>>>>> 02cbd1d006f56b4071817f1ffc0daf4cf15632f1
