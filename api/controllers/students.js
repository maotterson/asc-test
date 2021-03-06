const mongoose = require("mongoose");

const Student = require("../models/student");
const CheckIn = require("../models/checkin");

const { findExistingCheckInByStudentId } = require("../services/check-in-service");
const { addCheckOutForCheckIn } = require("../services/check-out-service");

//Checkout existing checkin based on student id
exports.checkout = async (req, res, next) => {
  try{
    const existingCheckIn = await findExistingCheckInByStudentId(req.params.studentid);
    if(!existingCheckIn){
      return res.status(401).json({
        message: "Cannot check-out (no existing check-in)"
      });
    }
    const updatedCheckIn = await addCheckOutForCheckIn(existingCheckIn)
    res.status(201).json({
      message: "Successfully checked out",
      body: updatedCheckIn
    });
  }
  catch(err) {
    res.status(500).json({
      error: err
    })
  }
};


exports.students_get_all = (req, res, next) => {
  res.status(200).json({
    message: "students get all"
  })
};