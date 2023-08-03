const attendanceModel = require("../models/attendance.model")
const studentModel = require("../models/student.model")

const getAttendanceByUserId = async (request, response) => {
    try {   
        const studentId = request.query.studentId
        const studentExists = await studentModel.findById(studentId)
        if (!studentExists) {
            return response.status(400).json({
                succes: false,
                message: "Student account does not exists"
            })
        }
        const attendance = await attendanceModel.find({studentId})
        return response.status(200).json({
            success: true,
            message: "Data retrieved successfully",
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

module.exports = {getAttendanceByUserId}