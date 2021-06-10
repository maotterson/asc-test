const mongoose = require('mongoose');

const checkInSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  studentId: {type: String, required: true},
  location: {type: String, required: true},
  tutor: {type: String, required: true},
  courseId: {type: String, required: true},
  reason: {type: String, required: true},
  checkInTime: {type: Date, required: true},
  checkOutTime: {type: Date},
});

module.exports = mongoose.model('CheckIn', checkInSchema);