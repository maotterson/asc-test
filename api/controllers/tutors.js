const mongoose = require("mongoose");
const axios = require('axios');
const dotenv = require("dotenv");

const Tutor = require("../models/tutor");

//Add courses for tutor
exports.edit_courses = async (req, res, next) => {
  try{
    const tutorId = req.params.tutorid
    const tutor = await Tutor.findOne({_id:tutorId}).exec()
    if(!tutor){
      return res.status(401).json({
        message: "Tutor Not Found"
      });
    }
    if(!Array.isArray(req.body)){
      return res.status(500).json({
        message: "Invalid format"
      });
    }
    tutor.courses = req.body

    await tutor.save()
    
    res.status(201).json({
      message: "Successfully updated courses",
      body: tutor.courses
    });
  }
  catch(err) {
    res.status(500).json({
      error: "Error"
    })
  }
};

exports.submit_avail_form = async (req, res, next) => {
  try{
    const data = req.body
    
    const rolesString = data.roles.join(", ")
    const lcString = data.learningcenters.join(", ")
    const coursesString = data.courses.join(", ")
    const date = new Date()

    const payload = {
      "name":data.name,
      "timestamp":date.toString(),
      "isInterested":data.isInterested,
      "roles":rolesString,
      "learningCenters":lcString,
      "courses":coursesString,
      "avail":data.avail,
      "misc":data.misc
    }

    const dest = process.env.TUTOR_AVAILABILITY_URI

    const response = axios.post(dest, payload)
    if(!response.status===200){
      return res.status(500).json({
        message: "Error"
      })
    }
    res.status(201).json({
      message: "Form submitted"
    })
  }
  catch(err) {
    res.status(500).json({
      error: "Error"
    })
  }
};