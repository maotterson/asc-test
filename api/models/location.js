const mongoose = require('mongoose');
const locationSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: string, 
    required: true
  }
});

module.exports = mongoose.model('Location', locationSchema);