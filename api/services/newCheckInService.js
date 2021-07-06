const mongoose = require("mongoose");
const CheckIn = require("../models/checkin/checkin");

exports.findExistingCheckInByStudentId = async (studentId) => {
  //verify that a current check-in doesn't already exist for that student
  const options = {
    student: studentId,
    checkOutTime: null
  };
  return await CheckIn.findOne(options).exec();
};

exports.findExistingCheckInByCheckInId = async (checkInId) => {
  //verify that a current check-in doesn't already exist for that student
  const options = {
    _id: checkInId,
    checkOutTime: null
  };
  return await CheckIn.findOne(options).exec();
};

exports.createNewCheckIn = async (req) => {
  //create new check-in
  const checkIn = new CheckIn({
    _id: new mongoose.Types.ObjectId(),
    student: req.body.studentid,
    location: req.body.location,
    tutor: req.body.tutor,
    course: req.body.courseid,
    reason: req.body.reason,
    checkInTime: Date.now(),
    checkOutTime: null
  });
  return await checkIn.save();
};