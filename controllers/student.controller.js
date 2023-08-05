<<<<<<< HEAD
const Student = require("../models/student.model");
const Class = require("../models/class.model");
const Teacher = require("../models/teacher.model");
const Course = require("../models/course.model");
const Lessons = require("../models/lessons.model");
const Assignment = require("../models/assignment.models");
const fetch = require("cross-fetch");
const { passwordCompare, passwordHash } = require("../helpers/bcrypt");
const { signToken } = require("../middlewares/jwt");
require("dotenv").config();

// ChatGPT Configs
const { Configuration, OpenAIApi } = require("openai");
const attendanceModel = require("../models/attendance.model");
const assignmentModels = require("../models/assignment.models");

const register = async (request, response) => {
  try {
    const {
      firstName,
      lastName,
      emailAddress,
      age,
      password,
      confirmPassword,
      academicYear,
    } = request.body;

    if (
      !firstName ||
      !lastName ||
      !emailAddress ||
      !age ||
      !password ||
      !confirmPassword
    ) {
      return response.status(401).json({
        success: false,
        message: "Please fill all required fields",
      });
    }
    const studentExists = await Student.findOne({ emailAddress: emailAddress });
    if (studentExists) {
      return response.status(400).json({
        success: false,
        message: "Student account already exists",
      });
    }
    if (password !== confirmPassword) {
      return response.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const hashedPassword = await passwordHash(password);
    const student = new Student({
      firstName: firstName,
      lastName: lastName,
      emailAddress: emailAddress,
      age: age,
      password: hashedPassword,
      academicYear: academicYear,
    });
    await student.save();
    return response.status(201).json({
      success: true,
      message: "Student record created successfully",
      Data: student,
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
    const student = await Student.findOne({ emailAddress: emailAddress });
    if (!emailAddress || !password) {
      return response.status(401).json({
        success: false,
        message: "Please fill all required fields",
      });
    }
    if (!student) {
      return response.status(400).json({
        success: false,
        message: "Student account does not exist, please sign up",
      });
    }
    const passwordMatch = await passwordCompare(password, student.password);
    if (!passwordMatch) {
      return response.status(400).json({
        success: false,
        message: "Passwords incorrect",
      });
    }

    const token = await signToken({ student });
    return response.status(200).json({
      success: true,
      message: "Logged in successfully",
      Data: token,
      student: student,
    });
  } catch (err) {
    return response.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const enrolClass = async (request, response) => {
  try {
    const studentId = request.user.student._id;
    const classId = request.query.classId;
    const studentExist = await Student.findById(studentId);
    const class1 = await Class.findById({ _id: classId });
    if (!studentExist) {
      return response.status(400).json({
        success: false,
        message: "You need to be registered to enrol a class",
      });
    }
    if (!class1) {
      return response.status(400).json({
        success: false,
        message: "Class no longer available",
      });
    }
    if (class1?.student?.includes(studentId)) {
      return response.status(400).json({
        success: false,
        message: "User is already enrolled in the class",
      });
    }
    class1.student.push(studentId);
    await class1.save();
    return response.status(200).json({
      success: true,
      message: "Enrolled successfully",
      Data: class1,
    });
  } catch (err) {
    return response.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getTeachers = async (request, response) => {
  try {
    const studentId = request.user.student._id;
    const studentExists = await Student.findById(studentId);
    if (!studentExists) {
      return response.status(400).json({
        succes: false,
        message: "Student account does not exists",
      });
    }
    const teachers = await Teacher.find();
    return response.status(200).json({
      succes: true,
      message: "Data retrieved successfully",
      Data: teachers,
    });
  } catch (err) {
    return response.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getClasses = async (request, response) => {
  try {
    const studentId = request.params.studentId;
    const studentExists = await Student.findById(studentId);
    if (!studentExists) {
      return response.status(400).json({
        succes: false,
        message: "Student account does not exists",
      });
    }
    const classes = await Class.find({})
      .populate("teacherId")
      .populate("assignment");

    const userClasses = [];
    if (classes) {
      classes?.forEach((myClass) => {
        if (myClass?.student?.includes(studentId)) {
          userClasses.push(myClass);
        }
      });
    }

    return response.status(200).json({
      succes: true,
      message: "Data retrieved successfully",
      Data: userClasses,
    });
  } catch (err) {
    return response.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getAbsences = async (request, response) => {
  try {
    const studentId = request.params.studentId;
    const studentExists = await Student.findById(studentId);
    if (!studentExists) {
      return response.status(400).json({
        succes: false,
        message: "Student account does not exists",
      });
    }
    const absences = await attendanceModel.find({
      student: studentId,
      isPresent: false,
    });
    return response.status(200).json({
      succes: true,
      message: "Data retrieved successfully",
      Data: absences,
    });
  } catch (err) {
    return response.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getCourses = async (request, response) => {
  try {
    const studentId = request.params.studentId;
    const studentExists = await Student.findById(studentId);
    if (!studentExists) {
      return response.status(400).json({
        succes: false,
        message: "Student account does not exists",
      });
    }
    const courses = await Course.find().populate("lessons").exec();

    const studentCourses = [];
    if (courses) {
      courses?.forEach((course) => {
        if (course?.students?.includes(studentId)) {
          studentCourses?.push(course);
        }
      });
    }
    return response.status(200).json({
      succes: true,
      message: "Data retrieved successfully",
      Data: studentCourses,
    });
  } catch (err) {
    return response.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const chatWithOpenAi = async (request, response) => {
  const message = request.body.message;

  if (!message) {
    return response
      .status(409)
      .json({ message: "Message cannot be left empty" });
  }

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
      max_tokens: 100,
    }),
  };

  try {
    const chatResponse = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );
    const data = await chatResponse.json();

    response.status(200).json({ data: data });
  } catch (error) {
    console.log("Chat completion error:", error);
  }
};

const markAttendance = async (request, response) => {
  try {
    const studentId = request.params.studentId;
    const isPresent = request.body.isPresent;
    const studentExists = await Student.findById(studentId);
    if (!studentExists) {
      return response.status(400).json({
        succes: false,
        message: "Student account does not exists",
      });
    }
    const attendance = new attendanceModel({
      studentId: studentId,
      time: Date.now(),
      isPresent: isPresent,
    });
    await attendance.save();
    return response.status(200).json({
      succes: true,
      message: "Attendance marked successfully",
      Data: attendance,
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
  enrolClass,
  getTeachers,
  getClasses,
  getAbsences,
  getCourses,
  chatWithOpenAi,
  markAttendance,
};
=======
const Student = require('../models/student.model')
const Class = require('../models/class.model')
const Teacher = require('../models/teacher.model')
const { passwordCompare, passwordHash } = require('../helpers/bcrypt')
const { signToken } = require('../middlewares/jwt')
require('dotenv').config()

// ChatGPT Configs
const { Configuration, OpenAIApi } = require("openai");
const attendanceModel = require('../models/attendance.model')
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


const register = async (request, response) => {
    try {
        const {
            firstName, lastName, emailAddress, age, password, confirmPassword, academicYear
        } = request.body

        if (!firstName || !lastName || !emailAddress || !age || !password || !confirmPassword) {
            return response.status(401).json({
                success: false,
                message: "Please fill all required fields"
            })
        }
        const studentExists = await Student.findOne({ emailAddress: emailAddress })
        if (studentExists) {
            return response.status(400).json({
                success: false,
                message: "Student account already exists"
            })
        }
        if (password !== confirmPassword) {
            return response.status(400).json({
                success: false,
                message: "Passwords do not match"
            })
        }

        const hashedPassword = await passwordHash(password)
        const student = new Student({
            firstName: firstName,
            lastName: lastName,
            emailAddress: emailAddress,
            age: age,
            password: hashedPassword,
            academicYear: academicYear
        })
        await student.save()
        return response.status(201).json({
            success: true,
            message: "Student record created successfully",
            Data: student
        })
    }
    catch (err) {
        return response.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const login = async (request, response) => {
    try {
        const { emailAddress, password } = request.body
        const student = await Student.findOne({ emailAddress: emailAddress })
        if (!emailAddress || !password) {
            return response.status(401).json({
                success: false,
                message: "Please fill all required fields"
            })
        }
        if (!student) {
            return response.status(400).json({
                success: false,
                message: "Student account does not exist, please sign up"
            })
        }
        const passwordMatch = await passwordCompare(password, student.password)
        if (!passwordMatch) {
            return response.status(400).json({
                success: false,
                message: "Passwords incorrect"
            })
        }

        const token = await signToken({ student })
        return response.status(200).json({
            success: true,
            message: "Logged in successfully",
            Data: token
        })
    }
    catch (err) {
        return response.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const enrolClass = async (request, response) => {
    try {
        const studentId = request.user.student._id
        const classId = request.query.classId
        const studentExist = await Student.findById(studentId)
        const class1 = await Class.findById({ _id: classId })
        if (!studentExist) {
            return response.status(400).json({
                success: false,
                message: "You need to be registered to enrol a class"
            })
        }
        if (!class1) {
            return response.status(400).json({
                success: false,
                message: "Class no longer available"
            })
        }
        if (class1.student.includes(studentId)) {
            return response.status(400).json({
                success: false,
                message: "User is already enrolled in the class"
            })
        }
        class1.student.push(studentId)
        await class1.save()
        return response.status(200).json({
            success: true,
            message: "Enrolled successfully",
            Data: class1
        })
    }
    catch (err) {
        return response.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const getTeachers = async (request, response) => {
    try {
        const studentId = request.user.student._id
        const studentExists = await Student.findById(studentId)
        if (!studentExists) {
            return response.status(400).json({
                succes: false,
                message: "Student account does not exists"
            })
        }
        const teachers = await Teacher.find()
        return response.status(200).json({
            succes: true,
            message: 'Data retrieved successfully',
            Data: teachers
        })
    }
    catch (err) {
        return response.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const chatWithOpenAi = async (request, response) => {
    const message = request.body.message
    if (!message) {
        return res.status(409).json({ message: 'Message cannot be left empty' })
    }

    try {
        const request = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: message,
            max_tokens: 7,
            temperature: 0
        });

        console.log('Chat completion response:', request.data)
        
    } catch (error) {
        console.log('Chat completion error:', error)
        
    }
}

const markAttendance = async(request, response) => {
    try {
        const studentId = request.user.student._id
        const studentExists = await Student.findById(studentId)
        if (!studentExists) {
            return response.status(400).json({
                succes: false,
                message: "Student account does not exists"
            })
        }
        const attendance = new attendanceModel({
            studentId: studentId,
            time: Date.now()
        })
        await attendance.save()
        return response.status(200).json({
            succes: true,
            message: "Attendance marked successfully",
            Data: attendance
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
    register, login, enrolClass, getTeachers, chatWithOpenAi, markAttendance
}
>>>>>>> 02cbd1d006f56b4071817f1ffc0daf4cf15632f1
