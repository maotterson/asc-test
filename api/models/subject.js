const mongoose = require('mongoose');
const subjectSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String, 
    required: true
  }
})

module.exports = mongoose.model('Subject', subjectSchema);