const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { getAvailableTutorEvents, getTutorByEmail } = require('../services/tutor-information-service');


// Get Available Tutors
exports.get_available_tutors = async (req, res, next) => {
  try{
    //get the raw outlook event data
    const tutorEvents = await getAvailableTutorEvents()

    //transform the data to be useful for our application
    tutorEvents.forEach(async tutorEvent => {
      if(tutorEvent.requiredAttendees){
        let email = tutorEvent.requiredAttendees
        email = email.split(';')[0];
        console.log(email)
        const tutor = await getTutorByEmail(email)
        console.log(tutor)
      }
    })

    res.status(200).json({
      tutors: tutorEvents
    })
  }
  catch (err) {
    console.log(err)
    res.status(500).json({
      error: err
    })
  }
};