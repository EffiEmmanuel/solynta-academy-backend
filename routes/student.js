<<<<<<< HEAD
const router = require("express").Router();
const {
  login,
  register,
  enrolClass,
  getTeachers,
  chatWithOpenAi,
  markAttendance,
  getClasses,
  getAbsences,
  getCourses,
} = require("../controllers/student.controller");
const { getLessons } = require("../controllers/lesson.controller");
const { authenticateToken } = require("../middlewares/jwt");

router.post("/register", register);
router.post("/login", login);
router.post("/enrolClass", authenticateToken, enrolClass);
router.get("/get-teachers", getTeachers);
router.get("/get-classes/:studentId", getClasses);
router.get("/get-attendance/:studentId", getClasses);
router.get("/get-absences/:studentId", getAbsences);
router.get("/get-courses/:studentId", getCourses);
router.get("/get-lessons", getLessons);
router.post("/ai-chat", chatWithOpenAi);
router.post("/mark-attendance", authenticateToken, markAttendance);

module.exports = router;
=======
const router = require('express').Router()
const {login, register, enrolClass, getTeachers, chatWithOpenAi, markAttendance} = require('../controllers/student.controller')
const {authenticateToken} = require('../middlewares/jwt')

router.post('/register', register)
router.post('/login', login)
router.post('/enrolClass', authenticateToken, enrolClass)
router.get('/get-teachers', authenticateToken, getTeachers)
router.post('/ai-chat', chatWithOpenAi)
router.post('/mark-attendance', authenticateToken, markAttendance)


module.exports = router
>>>>>>> 02cbd1d006f56b4071817f1ffc0daf4cf15632f1
