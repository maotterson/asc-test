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

// routes
const checkins = require('./api/routes/checkins');
const students = require('./api/routes/students');
const credentials = require('./api/routes/credentials');

// EXPRESS  ============================================================================
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors);

app.use('/api/checkins',checkins);
app.use('/api/students',students);
app.use('/api/credentials',credentials)

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
  res.render('error');
});

module.exports = app;
