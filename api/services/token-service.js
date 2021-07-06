const mongoose = require("mongoose");
const CheckIn = require("../models/checkin/checkin");
const Student = require("../models/student/student")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

exports.generateCheckInToken = (checkInId, expirationTime) => {
  const token = jwt.sign(checkInId, process.env.JWT_KEY, {expiresIn : expirationTime})
  return token
};

exports.isValidCheckInToken = async (checkInToken) => {
  
  return true
};