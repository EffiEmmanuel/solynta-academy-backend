const Parent = require("../models/parent.model");
const { passwordCompare, passwordHash } = require("../helpers/bcrypt");
const { signToken } = require("../middlewares/jwt");
const studentModel = require("../models/student.model");
const noteModel = require("../models/note.model");

const register = async (request, response) => {
  try {
    const {
      firstName,
      lastName,
      emailAddress,
      phoneNumber,
      password,
      confirmPassword,
    } = request.body;

    if (
      !firstName ||
      !lastName ||
      !emailAddress ||
      !password ||
      !confirmPassword
    ) {
      return response.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }
    const parentExists = await Parent.findOne({ emailAddress: emailAddress });
    if (parentExists) {
      return response.status(400).json({
        success: false,
        message: "Parent account already exists",
      });
    }
    if (password !== confirmPassword) {
      return response.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const hashedPassword = await passwordHash(password);
    const parent = new Parent({
      firstName: firstName,
      lastName: lastName,
      emailAddress: emailAddress,
      phoneNumber: phoneNumber,
      password: hashedPassword,
    });
    await parent.save();
    return response.status(201).json({
      success: true,
      message: "Parent record created successfully",
      Data: parent,
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
    const parent = await Parent.findOne({
      emailAddress: emailAddress,
    }).populate("children");
    if (!emailAddress || !password) {
      return response.status(401).json({
        success: false,
        message: "Please fill all required fields",
      });
    }
    if (!parent) {
      return response.status(400).json({
        success: false,
        message: "Parent account does not exist, please sign up",
      });
    }
    const passwordMatch = await passwordCompare(password, parent.password);
    if (!passwordMatch) {
      return response.status(400).json({
        success: false,
        message: "Passwords incorrect",
      });
    }

    const token = await signToken({ parent });
    return response.status(200).json({
      success: true,
      message: "Logged in successfully",
      Data: token,
      parent: parent,
    });
  } catch (err) {
    return response.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getStudents = async (request, response) => {
  try {
    const parentId = request.user.parent._id;
    const parentExists = await Parent.findById(parentId);
    if (!parentExists) {
      return response.status(400).json({
        success: false,
        message: "Parent account does not exist",
      });
    }
    const students = await studentModel.find({ parentId });
    return response.status(200).json({
      success: true,
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

const getChildNotes = async (request, response) => {
  try {
    const studentId = request.params.studentId;
    const notes = await noteModel
      .find({ student: studentId })
      .populate("teacherId");

    return response.status(200).json({
      success: true,
      message: "Data retrieved successfully",
      Data: notes,
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
  getStudents,
  getChildNotes,
};
