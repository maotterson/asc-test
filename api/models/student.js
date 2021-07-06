const mongoose = require('mongoose');
const studentSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  studentId: {
    type: String, 
    required: true
  },
  firstName: {
    type: String, 
    required: true
  },
  lastName: {
    type: String, 
    required: true
  }
})

module.exports = mongoose.model('Student', studentSchema);