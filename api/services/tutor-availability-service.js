const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const axios = require('axios');

const CheckIn = require("../models/checkin");
const Student = require("../models/student")

exports.getAvailableTutors = async () => {
  const currentTime = Date.now()
  const webhookURI = process.env.TUTORSCHEDULE_OUTLOOK_FLOW_URI;
  
  //todo: replace with current time
  const requestBody = {
    starttime: "2021-07-08T19:00:00+00:00",
    endtime: "2021-07-08T19:00:00+00:00"
  }
  
  //send post to location
  return await axios.post(webhookURI, requestBody);
  
};