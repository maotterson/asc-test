const mongoose = require('mongoose');

const checkInSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  studentId: {type: number, required: true},
  location: {type: String, required: true},
  tutorId: {type: mongoose.Schema.Types.ObjectId, required: true},
  courseId: {type: String, required: true},
  reason: {type: String, required: true}
})

module.exports = mongoose.model('CheckIn', checkInSchema);