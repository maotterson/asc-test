const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

const CheckIn = require("../models/checkin");
const Student = require("../models/student")

exports.generateCheckInToken = (checkInId, expirationTime) => {
  const token = jwt.sign(checkInId, process.env.JWT_KEY, {expiresIn : expirationTime})
  return token
};

exports.isValidCheckInToken = async (checkInToken) => {
  
  return true
};