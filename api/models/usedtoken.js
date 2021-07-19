const mongoose = require('mongoose');
const usedTokenSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  token: {
    type: String, 
    required: true
  }
});

module.exports = mongoose.model('UsedToken', usedTokenSchema);