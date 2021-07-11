const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { getAvailableTutorEvents } = require('../services/tutor-information-service');


// Get Available Tutors
exports.get_available_tutors = async (req, res, next) => {
  try{
    const tutorEvents = await getAvailableTutorEvents()
    const availableTutors = [];

    Object.keys(tutorEvents).forEach(subject => {
      tutorEvents[subject].forEach(availableTutor => {
        console.log(availableTutor)
      })
    })

    res.status(200).json({
      tutors: availableTutors
    })
  }
  catch (err) {
    console.log(err)
    res.status(500).json({
      error: err
    })
  }
};