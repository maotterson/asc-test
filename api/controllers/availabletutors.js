const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { getAvailableTutors } = require("../services/tutor-availability-service");


// Get Available Tutors
exports.get_available_tutors = async (req, res, next) => {
  try{
    const tutors = await getAvailableTutors();

    res.status(200).json({
      message: tutors
    })
  }
  catch (err) {
    console.log(err)
    res.status(500).json({
      error: err
    })
  }
};