const router = require("express").Router();
const formidable = require("express-formidable");
const {
  login,
  register,
  getAllStudents,
  createBook,
  getTeacherBooks,
  deleteTeacherBook,
  createVideo,
  getTeacherVideos,
  deleteTeacherVideo,
  createNote,
} = require("../controllers/teacher.controller");
const { authenticateToken } = require("../middlewares/jwt");
const {
  createClass,
  getAllClassesCreated,
} = require("../controllers/class.controller");
const {
  getAttendanceByUserId,
} = require("../controllers/attendance.controller");
const { createAssignment } = require("../controllers/assignment.controller");
const {
  createCourse,
  getAllCourses,
  deleteCourse,
} = require("../controllers/course.controller");
const {
  createLesson,
  getLessons,
  deleteLesson,
} = require("../controllers/lesson.controller");

router.post("/register", register);
router.post("/login", login);
// router.post('/createClass', authenticateToken, createClass)
// router.get('/get-created-classes', authenticateToken, getAllClassesCreated)
// router.get('/get-students', authenticateToken, getAllStudents)
// router.get('/get-attendance', authenticateToken, getAttendanceByUserId)
// router.post('/create-assignment', authenticateToken, createAssignment)
// router.post('/create-course', authenticateToken, createCourse)
// router.get('/get-courses', authenticateToken, getAllCourses)
// router.delete('/delete-course', authenticateToken, deleteCourse)
// router.post('/create-book', authenticateToken, createCourse)
// router.get('/get-teacher-books/:teacherId', authenticateToken, getAllCourses)
// router.delete('/delete-course', authenticateToken, deleteCourse)
// router.post('/create-lesson', authenticateToken, formidable(), createLesson)
// router.get('/get-lesson', authenticateToken, getLessons)
// router.delete('/delete-lesson', authenticateToken, deleteLesson)

// UNPROTECTED
router.post("/createClass", createClass);
router.get("/get-created-classes", getAllClassesCreated);
router.get("/get-students", getAllStudents);
router.get("/get-attendance", getAttendanceByUserId);
router.post("/create-assignment", createAssignment);
router.post("/create-course", createCourse);
router.get("/get-courses", getAllCourses);
router.delete("/delete-course", deleteCourse);
router.post("/create-book", createBook);
router.get("/get-teacher-books/:teacherId", getTeacherBooks);
router.delete("/delete-teacher-book/:bookId/:teacherId", deleteTeacherBook);
router.post("/create-video", createVideo);
router.get("/get-teacher-videos/:teacherId", getTeacherVideos);
router.delete("/delete-teacher-video/:videoId/:teacherId", deleteTeacherVideo);
router.post("/create-lesson", formidable(), createLesson);
router.post("/create-note", createNote);
router.get("/get-lessons", getLessons);
router.delete("/delete-lesson", deleteLesson);

module.exports = router;
