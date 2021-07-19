const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const CheckIn = require("../models/checkin");
const Student = require("../models/student");
const Tutor = require("../models/tutor");
const { generateTutorAvailToken } = require("../services/token-service");

// Check credentials for student
exports.check_tutor_email = async (req, res, next) => {
  try{
    const email = req.body.email;
    const code = req.body.availCode;
    if(!email||!code){
      return res.status(500).json({
        message: "Invalid tutor email or token",
      })
    }

    const matchingTutor = await Tutor.findOne(
    {
      email:email.toLowerCase(), 
      availCode:code
    })
    .exec()
      
    if(!matchingTutor){
      return res.status(500).json({
        message: "Invalid tutor email or token",
      })
    }
    
    const token = generateTutorAvailToken(matchingTutor._id, '24h')

    res.status(200).json({
      message: "Matching tutor found",
      tutor: matchingTutor,
      jwt: token
    })
  }
  catch (err) {
    console.log(err)
    res.status(500).json({
      error: err
    })
  }
};