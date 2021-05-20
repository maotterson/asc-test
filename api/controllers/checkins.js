const mongoose = require("mongoose");
const Student = require("../models/student");

exports.checkins_create = (req, res, next) => {
  res.status(200).json({
    message: "created check-in"
  })
};