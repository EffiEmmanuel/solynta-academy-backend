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