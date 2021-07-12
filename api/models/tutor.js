const mongoose = require('mongoose');
const tutorSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstname: {
    type: String, 
  },
  lastname: {
    type: String, 
  },
  name:{
    type: String
  },
  email: 
  {
    type: String, 
    required: true
  },
  courses: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Course',
    required: true
  }
});

module.exports = mongoose.model('Tutor', tutorSchema);