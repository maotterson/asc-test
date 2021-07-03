const mongoose = require("mongoose");
const CheckIn = require("../models/checkin/checkin");
const { sendCheckInMessage } = require("../services/sendteamsmessage");

//Create new check-in
exports.checkins_create = (req, res, next) => {
  //verify that a current check-in doesn't already exist for that student
  CheckIn.findOne({
    student: req.body.studentid,
    checkOutTime: null
  })
  .exec()
  .then(result => {
    if(result){
      return res.status(401).json({
        message: "Already checked-in"
      });
    }
    else{
      const checkIn = new CheckIn({
        _id: new mongoose.Types.ObjectId(),
        student: req.body.studentid,
        location: req.body.location,
        tutor: req.body.tutor,
        course: req.body.courseid,
        reason: req.body.reason,
        checkInTime: Date.now(),
        checkOutTime: null
      });
    
      checkIn.save()
      .then(result => {
        console.log(result);
        sendCheckInMessage(result).then(()=>{
          res.status(201).json({
            message: "POST @ /users (creating new check-in)",
            createdUser: result
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        })
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
};

//Get list of checkins
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

//Checkout existing checkin
exports.checkout = (req, res, next) => {
  const checkinid = req.params.checkinid;
  CheckIn.findOne({
    _id: checkinid,
    checkOutTime: null
  })
  .exec()
  .then(result => {
    if(result)
    {
      const checkOutTime = Date.now();
      result.checkOutTime = checkOutTime
      console.log(result)
      result.save().then(
        result => {
        res.status(201).json({
          message: "Successfully checked out",
          time: checkOutTime
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
    }
    else{
      res.status(401).json({
        message: "Cannot check-out (already checked-out)"
      });
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
};