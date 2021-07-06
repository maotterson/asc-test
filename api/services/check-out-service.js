const mongoose = require("mongoose");
const CheckIn = require("../models/checkin");

exports.addCheckOutForCheckIn = async (checkIn) => {
  const checkOutTime = Date.now();
  checkIn.checkOutTime = checkOutTime
  return await checkIn.save()
};