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
  scheduleName:{
    type: String
  },
  email: 
  {
    type: String, 
    required: true
  },
  courses: {
    type: [String]
  },
  subject:{
    type: String
  }
});

module.exports = mongoose.model('Tutor', tutorSchema);