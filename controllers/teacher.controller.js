const Teacher = require("../models/teacher.model");
const Student = require("../models/student.model");
const bookModel = require("../models/book.model");
const videoModel = require("../models/video.model");
const noteModel = require("../models/note.model");
const { cloudinaryUpload } = require("../helpers/cloudinary");
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

const createBook = async (request, response) => {
  try {
    const { title, author, image, teacherId } = request.body;
    // const photo = request.files.file;
    const book = new bookModel({
      title: title,
      author: author,
      teacherId: teacherId,
      image: image,
    });

    if (image) {
      await cloudinaryUpload(image.path)
        .then((downloadURL) => {
          book.image = downloadURL;
        })
        .catch((err) => {
          return response.status(400).json({ message: err.message });
        });
    }
    await book.save();

    return response.status(201).json({
      success: true,
      message: "book created successfully",
      Data: book,
    });
  } catch (err) {
    return response.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getTeacherBooks = async (request, response) => {
  const teacherId = request.params.teacherId;
  try {
    const books = await bookModel.find({ teacherId: teacherId });
    return response.status(200).json({
      success: true,
      message: "Data retrieved successfully",
      Data: books,
    });
  } catch (err) {
    return response.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteTeacherBook = async (request, response) => {
  const { teacherId, bookId } = request.params;
  try {
    await bookModel.findByIdAndDelete({ _id: bookId, teacherId: teacherId });
    return response.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (err) {
    return response.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const createVideo = async (request, response) => {
  try {
    const { title, link, image, teacherId } = request.body;
    // const photo = request.files.file;
    const video = new videoModel({
      title: title,
      link: link,
      teacherId: teacherId,
      image: image,
    });

    if (image) {
      await cloudinaryUpload(image.path)
        .then((downloadURL) => {
          video.image = downloadURL;
        })
        .catch((err) => {
          return response.status(400).json({ message: err.message });
        });
    }
    await video.save();

    return response.status(201).json({
      success: true,
      message: "Video created successfully",
      Data: video,
    });
  } catch (err) {
    return response.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getTeacherVideos = async (request, response) => {
  const teacherId = request.params.teacherId;
  try {
    const videos = await videoModel.find({ teacherId: teacherId });
    return response.status(200).json({
      success: true,
      message: "Data retrieved successfully",
      Data: videos,
    });
  } catch (err) {
    return response.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteTeacherVideo = async (request, response) => {
  const { teacherId, videoId } = request.params;
  try {
    await videoModel.findByIdAndDelete({ _id: videoId, teacherId: teacherId });
    return response.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (err) {
    return response.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const createNote = async (request, response) => {
  try {
    const { note, studentId, teacherId } = request.body;
    // const photo = request.files.file;
    const newNote = new noteModel({
      note: note,
      student: studentId,
      teacherId: teacherId,
    });

    await newNote.save();

    return response.status(201).json({
      success: true,
      message: "note created successfully",
      Data: newNote,
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
  createBook,
  getTeacherBooks,
  deleteTeacherBook,
  createVideo,
  createNote,
  getTeacherVideos,
  deleteTeacherVideo,
};
