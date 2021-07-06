const mongoose = require("mongoose");

const CheckIn = require("../models/checkin");
const Student = require("../models/student")

exports.verifyStudentCredentials = async (studentId, lastName) => {
  const options = {
    studentId: studentId,
    lastName: lastName
  }
  return await Student.findOne(options).exec()
};