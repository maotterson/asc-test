const mongoose = require("mongoose");
const Student = require("../models/student");

exports.students_get_all = (req, res, next) => {
  res.status(200).json({
    message: "students get all"
  })
};