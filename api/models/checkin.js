const mongoose = require('mongoose');
const checkInSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  student: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Student',
    required: true
  },
  location: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Location',
    required: true
  },
  tutor: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Tutor',
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  reason: {
    type: String, 
    required: true
  },
  checkInTime: {
    type: Date, 
    required: true
  },
  checkOutTime: {
    type: Date
  },
});

module.exports = mongoose.model('CheckIn', checkInSchema);