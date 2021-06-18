const mongoose = require('mongoose');

module.exports = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String, 
    required: true
  }
})