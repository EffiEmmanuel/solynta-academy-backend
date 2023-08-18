const Class = require("../models/class.model");
const Teacher = require("../models/teacher.model");
const Student = require("../models/student.model");

const createClass = async (request, response) => {
  try {
    const teacherId = request.body.teacher._id;
    const { className, description } = request.body;
    const teacherExists = await Teacher.findById(teacherId);
    if (!teacherExists) {
      return response.status(400).json({
        success: false,
        message: "Please create an account",
      });
    }
    const newClass = new Class({
      className: className,
      description: description,
      teacherId: teacherId,
    });
    await newClass.save();
    return response.status(201).json({
      success: true,
      message: "Class created successfully",
      Data: newClass,
    });
  } catch (err) {
    return response.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getAllClassesCreated = async (request, response) => {
  try {
    const teacherId = request.body.teacher._id;
    const teacherExists = await Teacher.findById(teacherId);
    if (!teacherExists) {
      return response.status(400).json({
        success: false,
        message: "Teacher account does not exists",
      });
    }
    const class1 = await Class.find({ teacherId });
    return response.status(200).json({
      success: true,
      message: "Records retrieved successfully",
      Data: class1,
    });
  } catch (err) {
    return response.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  createClass,
  getAllClassesCreated,
};
