const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { getAvailableTutorEvents, getTutorByName } = require('../services/tutor-information-service');


// Get Available Tutors
exports.get_available_tutors = async (req, res, next) => {
  try{
    //get the raw outlook event data
    const tutorEvents = await getAvailableTutorEvents()
    const tutors = []

    //transform the data to be useful for our application
    for(const tutorEvent of tutorEvents){
      if(tutorEvent.subject){
        const subject = tutorEvent.subject
        tutorName = subject.split('.')[0];
        const tutor = await getTutorByName(tutorName)
        tutors.push(tutor)
      }
    }
    console.log(tutors)

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