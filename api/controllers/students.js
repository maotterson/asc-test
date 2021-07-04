const mongoose = require("mongoose");
const Student = require("../models/student/student");

exports.students_get_all = (req, res, next) => {
  res.status(200).json({
    message: "students get all"
  })
};

//Checkout existing checkin based on student id
exports.checkout = (req, res, next) => {
  const studentid = req.params.studentid;
  CheckIn.findOne({
    student: studentid,
    checkOutTime: null
  })
  .exec()
  .then(result => {
    if(result)
    {
      const checkOutTime = Date.now();
      result.checkOutTime = checkOutTime
      console.log(result)
      result.save().then(
        result => {
        res.status(201).json({
          message: "Successfully checked out",
          time: checkOutTime
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
    }
    else{
      res.status(401).json({
        message: "Cannot check-out (no existing check-in)"
      });
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
};