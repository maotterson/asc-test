const mongoose = require("mongoose");
const CheckIn = require("../models/checkin/checkin");
const Student = require("../models/student/student")

//Create new check-in
exports.credentials_check = (req, res, next) => {
  //verify that a current check-in doesn't already exist for that student
  Student.findOne({
    studentId: req.body.studentid,
    lastName: req.body.lastName
  })
  .exec()
  .then(result => {
    if(result){
      return res.status(200).json({
        message: "Student found in database",
        student: result

      });
    }
    else{
        return res.status(401).json({
            message: "Student not found in database",
            student: result
    
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