const mongoose = require('mongoose');
const tutorSchema = require('./tutor-schema');

module.exports = mongoose.model('Tutor', tutorSchema);