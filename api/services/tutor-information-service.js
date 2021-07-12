const Tutor = require("../models/tutor");
const axios = require('axios');
const dotenv = require("dotenv")

exports.getTutorById = async (tutorid) => {
  return await Tutor.findOne({
    _id: tutorid
  });
};

exports.getTutorByEmail = async (email) => {
  return await Tutor.findOne({
    email: email
  });
};

exports.getTutorByName = async (name) => {
  return await Tutor.findOne({
    name:name
  })
}

exports.getAvailableTutorEvents = async () => {
  const currentTimeInt = Date.now()
  const currentTime = new Date(Date.now());
  const webhookURI = process.env.TUTORSCHEDULE_OUTLOOK_FLOW_URI;
  
  //todo: replace with current time
  const requestBody = {
    starttime: currentTime,
    endtime: currentTime
  }
  
  //send post to location
  const response = await axios.post(webhookURI, requestBody)
  const data = response.data
  const availableTutorEvents = []

  //iterate over the subject calendars
  Object.keys(data).forEach(subject => {
    data[subject].forEach(availableTutor => {
      availableTutorEvents.push(availableTutor)
    })
  })

  return availableTutorEvents

};