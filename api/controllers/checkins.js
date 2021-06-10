const mongoose = require("mongoose");
const CheckIn = require("../models/checkin");

exports.checkins_create = (req, res, next) => {
  const checkIn = new CheckIn({
    _id: new mongoose.Types.ObjectId(),
    studentId: req.body.studentid,
    location: req.body.location,
    tutor: req.body.tutor,
    courseId: req.body.courseid,
    reason: req.body.reason,
    checkInTime: Date.now(),
    checkOutTime: null
  });

  checkIn.save()
  .then(result => {
    console.log(result);
    res.status(201).json({
      message: "POST @ /users (creating new check-in)",
      createdUser: result
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
};

exports.checkins_get = (req, res, next) => {
  CheckIn.find()
  .exec()
  .then(results => {
    console.log(results);
    res.status(200).json({
      message: "GET @ /users (retrieving all check-ins)",
      body: results
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
};