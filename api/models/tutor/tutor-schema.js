const mongoose = require('mongoose');

module.exports = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String, 
    required: true
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