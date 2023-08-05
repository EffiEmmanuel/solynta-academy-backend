<<<<<<< HEAD
const assignmentModels = require("../models/assignment.models");

const createAssignment = async (request, response) => {
  try {
    const { title, deadline } = request.body;
    const assignment = new assignmentModels({
      title: title,
      deadline: deadline,
    });
    await assignment.save();
    return response.status(201).json({
      success: true,
      message: "Assignmnent created successfully",
      Data: assignment,
    });
  } catch (err) {
    return response.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  createAssignment,
};
=======
const assignmentModels = require("../models/assignment.models")

const createAssignment = async (request, response) => {
    try {
        const { title, deadline} = request.body
        const assignment = new assignmentModels({
            title: title,
            deadline: deadline
        })
        await assignment.save()
        return response.status(201).json({
            success: true,
            message: "Assignmnent created successfully",
            Data: assignment
        })
    }
    catch (err) {
        return response.status(500).json({
            success: false,
            message: err.message
        })
    }
}

module.exports =  {
    createAssignment
}
>>>>>>> 02cbd1d006f56b4071817f1ffc0daf4cf15632f1
