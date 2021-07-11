const Tutor = require("../models/tutor");
const axios = require('axios');
const dotenv = require("dotenv")

exports.getTutorById = async (tutorid) => {
  return await Tutor.findOne({
    _id: tutorid
  });
};

exports.getAvailableTutorEvents = async () => {
  const currentTime = Date.now()
  const webhookURI = process.env.TUTORSCHEDULE_OUTLOOK_FLOW_URI;
  
  //todo: replace with current time
  const requestBody = {
    starttime: "2021-07-08T19:00:00+00:00",
    endtime: "2021-07-08T19:00:00+00:00"
  }
  
  //send post to location
  const response = await axios.post(webhookURI, requestBody);
  return response.data
  
};