const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { getAvailableTutorEvents, extractTutorNamesFromEvents, getTutorsByNames } = require('../services/tutor-information-service');


// Get Available Tutors
exports.get_available_tutors = async (req, res, next) => {
  try{
    //get the raw outlook event data
    const tutorEvents = await getAvailableTutorEvents()
    const tutorNames = extractTutorNamesFromEvents(tutorEvents)
    const tutors = await getTutorsByNames(tutorNames)

    res.status(200).json({
      tutors: tutors
    })
  }
  catch (err) {
    console.log(err)
    res.status(500).json({
      error: err
    })
  }
};