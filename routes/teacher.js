const router = require('express').Router()
const formidable = require('express-formidable')
const {login, register, getAllStudents} = require('../controllers/teacher.controller')
const {authenticateToken} = require('../middlewares/jwt')
const {createClass, getAllClassesCreated} = require('../controllers/class.controller')
const { getAttendanceByUserId } = require('../controllers/attendance.controller')
const { createAssignment } = require('../controllers/assignment.controller')
const { createCourse, getAllCourses, deleteCourse } = require('../controllers/course.controller')
const { createLesson, getLessons, deleteLesson } = require('../controllers/lesson.controller')

router.post('/register', register)
router.post('/login', login)
router.post('/createClass', authenticateToken, createClass)
router.get('/get-created-classes', authenticateToken, getAllClassesCreated)
router.get('/get-students', authenticateToken, getAllStudents)
router.get('/get-attendance', authenticateToken, getAttendanceByUserId)
router.post('/create-assignment', authenticateToken, createAssignment)
router.post('/create-course', authenticateToken, createCourse)
router.get('/get-courses', authenticateToken, getAllCourses)
router.delete('/delete-course', authenticateToken, deleteCourse)
router.post('/create-lesson', authenticateToken, formidable(), createLesson)
router.get('/get-lesson', authenticateToken, getLessons)
router.delete('/delete-lesson', authenticateToken, deleteLesson)

module.exports = router