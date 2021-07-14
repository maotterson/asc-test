const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

const CheckIn = require("../models/checkin");
const Student = require("../models/student");
const usedtoken = require("../models/usedtoken");

exports.generateCheckInToken = (checkInId, expirationTime) => {
  const token = jwt.sign({checkInId}, process.env.JWT_KEY, {expiresIn : expirationTime})
  console.log(token)
  return token
};

exports.isValidCheckInToken = (checkInToken) => {
  return true
};

exports.generateTutorAvailToken = (tutorId, expirationTime) => {
  const token = jwt.sign({tutorId}, process.env.JWT_TUTOR_KEY, {expiresIn : expirationTime})
  return token
};

exports.isValidTutorToken = async (token) => {
  return jwt.verify(token,process.env.JWT_TUTOR_KEY, async (err, decoded) => {
    if(err){
      return false
    }
    const inserttoken = await usedtoken.find({}).exec()
    console.log(inserttoken)
    const hasTokenBeenUsed = await this.isBlackListedToken(token)
    console.log(hasTokenBeenUsed)
    if(hasTokenBeenUsed){
      return false
    }
    return true
  })
};

exports.isBlackListedToken = async (token) => {
  const existingtoken = await usedtoken.findOne({token:token}).exec();
  if(existingtoken){
    return true
  }
  return false
}