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
router.post("/mark-attendance/:studentId", authenticateToken, markAttendance);

module.exports = router;
