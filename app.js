// IMPORTS ============================================================================
// node modules
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const dotenv = require('dotenv').config();
const mongoose = require("mongoose");

//connect to db via mongoose
mongoose.connect(
  process.env.COSMOS_CONNECTION_STRING, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);


// custom middleware
const cors = require('./middleware/cors');

// page routes
const pages = require('./pages/routes');

// api routes
const checkins = require('./api/routes/checkins');
const students = require('./api/routes/students');
const credentials = require('./api/routes/credentials');
const events = require('./api/routes/events');
const availableTutors = require('./api/routes/availabletutors.js');

// EXPRESS  ============================================================================
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors);

app.use('/api/checkins',checkins);
app.use('/api/students',students);
app.use('/api/credentials',credentials)
app.use('/api/availableTutors',availableTutors)
app.use('/api/events',events)

// If we opt to serve pages from our api, maybe not the best solution
//app.use('/',pages);
//app.use(express.static('pages/public'));

// ERROR FALL THROUGH  =================================================================
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("Invalid request.")
});

module.exports = app;
