const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");


// Check credentials for student
exports.add_event = async (req, res, next) => {
  try{
    console.log(req.body)
    res.status(200).json({
      message: "successfully triggered"
    })
  }
  catch (err) {
    console.log(err)
    res.status(500).json({
      error: err
    })
  }
};