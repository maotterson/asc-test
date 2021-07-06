const mongoose = require("mongoose");
const CheckIn = require("../models/checkin/checkin");
const { addCheckOutForCheckIn } = require("../services/checkOutService");
const { findExistingCheckInByStudentId, findExistingCheckInByCheckInId, createNewCheckIn } = require("../services/newCheckInService");
const { sendCheckInMessage } = require("../services/teamsMessageService");

// Create new check-in
exports.checkins_create = async (req, res, next) => {
  try {
    // verify that a current check-in doesn't already exist for that student
    const existingCheckIn = await findExistingCheckInByStudentId(req.body.studentid)
    if(existingCheckIn){
      return res.status(401).json({
        message: "Already checked-in"
      });
    }

    // create new check-in
    const newCheckIn = await createNewCheckIn(req)

    // send teams message (works but commenting out to prevent sending a bunch of messages)
    // await sendCheckInMessage(newCheckIn)
  
    //send 201 success
    res.status(201).json({
      message: "POST @ /users (creating new check-in)",
      data: newCheckIn
    });
  }
  catch(err){
    console.log(err);
    res.status(500).json({
      error: err
    });
  }
};

// Create check-out existing checkin
exports.checkout = async (req, res, next) => {
  try{
    // check for existing check-in by id
    const existingCheckIn = await findExistingCheckInByCheckInId(req.params.checkinid)

    // no open check-in for that id
    if(!existingCheckIn){
      return res.status(401).json({
        message: "Cannot check-out (already checked-out)"
      });
    }
    const updatedCheckIn = await addCheckOutForCheckIn(existingCheckIn)
    res.status(201).json({
      message: "Successfully checked out",
      body: updatedCheckIn
    });
  }
  catch(err){
    console.log(err);
    res.status(500).json({
      error: err
    });
  }
};


//Get list of checkins (todo)
exports.checkins_get = (req, res, next) => {
  //filter for optional query string parameters
  const filter = {
  }
  console.log(req.query)

  //validate dates
  let start, end, date
  try{
    start = req.query.start ? new Date(req.query.start) : ""
    end = req.query.end ? new Date(req.query.end) : ""
    date = req.query.date ? new Date(req.query.date) : ""
    //start date filter
    if(start!="Invalid Date"&&start!=""){
      filter['checkInTime']={}; 
      filter['checkInTime']['$gte']=start;  
      
      //start and end date filter
      if(end!="Invalid Date"&&end!=""){
        filter['checkInTime']['$lte']=end;
      }
    }
    //end date filter
    else if(end!="Invalid Date"&&end!=""){
      filter['checkInTime']={}; 
      filter['checkInTime']['$lte']=end;
    }
    
    //current date filter
    if(req.query.date=="today"||(date!="Invalid Date"&&date!="")){
      if(req.query.date=="today"){
        let startdate = new Date();
        startdate=Date.now();
        filter['checkInTime']={};
        filter['checkInTime']['$gte']=startdate;
        let tomorrow = new Date();
        tomorrow = tomorrow.setDate(startdate.getDate() + 1);
        filter['checkInTime']['$lte']=tomorrow;
      }
      else{
        filter['checkInTime']={};
        filter['checkInTime']['$gte']=date;
        let tomorrow = new Date();
        tomorrow = tomorrow.setDate(date.getDate() + 1);
        filter['checkInTime']['$lte']=tomorrow;
      }
    }
  }
  catch (err){
    console.log(err)
  }
  console.log(filter)
  CheckIn.find(filter)
  .exec()
  .then(results => {
    console.log(results);
    res.status(200).json({
      message: "GET @ /users (retrieving check-ins)",
      data: results
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
};