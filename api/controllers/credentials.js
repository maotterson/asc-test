const mongoose = require("mongoose");
const CheckIn = require("../models/checkin/checkin");
const Student = require("../models/student/student");
const { verifyStudentCredentials } = require("../services/studentCredentialsService");

// Check credentials for student
exports.credentials_check = async (req, res, next) => {
  try{
    // verify that there is a matching student
    const student = await verifyStudentCredentials(req.body.studentid, req.body.lastName)

    // if no matching student
    if(!student){
      return res.status(401).json({
        message: "Student not found in database"
      })
    }
    res.status(200).json({
      message: "Student found in database",
      student: student

    })
  }
  catch (err) {
    console.log(err)
    res.status(500).json({
      error: err
    })
  }
};