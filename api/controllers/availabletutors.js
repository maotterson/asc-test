const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { getAvailableTutorEvents, extractTutorNamesWithSubjectsFromEvents, getTutorsByNames } = require('../services/tutor-information-service');


// Get Available Tutors
exports.get_available_tutors = async (req, res, next) => {
  try{
    //get the raw outlook event data
    const tutorEvents = await getAvailableTutorEvents()
    const tutorNamesWithSubjects = extractTutorNamesWithSubjectsFromEvents(tutorEvents)
    const tutors = await getTutorsByNames(tutorNamesWithSubjects)

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