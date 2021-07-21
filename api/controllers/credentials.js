const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const CheckIn = require("../models/checkin");
const Student = require("../models/student");

const { verifyStudentCredentials } = require("../services/student-credentials-service");
const { generateCheckInToken } = require("../services/token-service");
const { generateCheckinId } = require("../services/check-in-service");

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
    
    // generate a check-in id
    const checkInId = generateCheckinId()
    
    // generate auth token for generated check-in id
    const tokenDuration = 300; // 300 seconds
    const token = generateCheckInToken(checkInId, tokenDuration)

    res.status(200).json({
      message: "Student found in database",
      student: student,
      token: token
    })
  }
  catch (err) {
    console.log(err)
    res.status(500).json({
      error: err
    })
  }
};