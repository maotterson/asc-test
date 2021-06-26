const mongoose = require('mongoose');
const locationSchema = require('./location-schema');

module.exports = mongoose.model('Location', locationSchema);