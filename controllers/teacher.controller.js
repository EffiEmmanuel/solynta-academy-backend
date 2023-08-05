const Teacher = require("../models/teacher.model");
const Student = require("../models/student.model");
const { passwordCompare, passwordHash } = require("../helpers/bcrypt");
const { signToken } = require("../middlewares/jwt");

const register = async (request, response) => {
  try {
    const {
      firstName,
      lastName,
      emailAddress,
      phoneNumber,
      password,
      confirmPassword,
      higherEducation,
      subjectSpecialism,
      experienceSince,
    } = request.body;

    if (
      !firstName ||
      !lastName ||
      !emailAddress ||
      !password ||
      !confirmPassword
    ) {
      return response.status(401).json({
        success: false,
        message: "Please fill all required fields",
      });
    }
    const teacherExists = await Teacher.findOne({ emailAddress: emailAddress });
    if (teacherExists) {
      return response.status(400).json({
        success: false,
        message: "Taecher account already exists",
      });
    }
    if (password !== confirmPassword) {
      return response.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const hashedPassword = await passwordHash(password);
    const teacher = new Teacher({
      firstName: firstName,
      lastName: lastName,
      emailAddress: emailAddress,
      phoneNumber: phoneNumber,
      password: hashedPassword,
      higherEducation: higherEducation,
      subjectSpecialism: subjectSpecialism,
      experienceSince: experienceSince,
    });
    await teacher.save();
    return response.status(201).json({
      success: true,
      message: "Teacher record created successfully",
      Data: teacher,
    });
  } catch (err) {
    return response.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const login = async (request, response) => {
  try {
    const { emailAddress, password } = request.body;
    const teacher = await Teacher.findOne({ emailAddress: emailAddress });
    if (!emailAddress || !password) {
      return response.status(401).json({
        success: false,
        message: "Please fill all required fields",
      });
    }
    if (!teacher) {
      return response.status(400).json({
        success: false,
        message: "Teacher account does not exist, please sign up",
      });
    }
    const passwordMatch = await passwordCompare(password, teacher.password);
    if (!passwordMatch) {
      return response.status(400).json({
        success: false,
        message: "Passwords incorrect",
      });
    }

    const token = signToken({ teacher });
    return response.status(200).json({
      success: true,
      message: "Logged in successfully",
      Data: token,
      teacher: teacher,
    });
  } catch (err) {
    return response.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getAllStudents = async (request, response) => {
  try {
    const teacherId = request.user.teacher._id;
    const teacherExits = await Teacher.findById(teacherId);
    if (!teacherExits) {
      return response.status(400).json({
        succes: false,
        message: "Teacher account does not exists",
      });
    }
    const students = await Student.find();
    return response.status(200).json({
      succes: true,
      message: "Data retrieved successfully",
      Data: students,
    });
  } catch (err) {
    return response.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  register,
  login,
  getAllStudents,
};
