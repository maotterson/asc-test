const mongoose = require('mongoose');
const eventSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  startdate: {
    type: String, 
    required: true
  },
  enddate: 
  {
    type: String, 
    required: true
  },
  tutor: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Tutor',
    required: true
  },
  isAppointment: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('Event', eventSchema);