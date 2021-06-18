const mongoose = require('mongoose');
const checkInSchema = require('./checkin-schema');

module.exports = mongoose.model('CheckIn', checkInSchema);