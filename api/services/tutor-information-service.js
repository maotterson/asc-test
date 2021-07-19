const Tutor = require("../models/tutor");
const axios = require('axios');
const dotenv = require("dotenv");

exports.getTutorById = async (tutorid) => {
  return await Tutor.findOne({
    _id: tutorid
  });
};

exports.getTutorByEmail = async (email) => {
  return await Tutor.findOne({
    email: email
  });
};

exports.getTutorByName = async (name) => {
  return await Tutor.findOne({
    name:name
  })
}

exports.getTutorsByNames = async (namesWithSubjects) =>{
  // lookup tutors using their names
  const namesOnly = []
  namesWithSubjects.forEach(nameWithSubject =>{
    namesOnly.push(nameWithSubject.tutorName)
  })

  matchingTutors = await Tutor.find({
    name: {
      $in : namesOnly
    }
  })

  //include the subject they are currently working
  matchingTutors.forEach(tutor =>{
    const nameWithSubject = namesWithSubjects.find(({tutorName})=> tutorName===tutor.name)
    tutor.subject=nameWithSubject.subject
  })

  return matchingTutors

}

exports.extractTutorNamesWithSubjectsFromEvents = (events) =>{
  const tutorNamesWithSubjects = []
  for(const tutorEvent of events){
    if(tutorEvent.subject){
      const tutoringSubject = tutorEvent.tutoringSubject
      const subject = tutorEvent.subject
      const tutorName = subject.split('.')[0];
      tutorNamesWithSubjects.push({
        tutorName: tutorName,
        subject: tutoringSubject
      })
    }
  }
  return tutorNamesWithSubjects
}

exports.getAvailableTutorEvents = async () => {
  const currentTimeInt = Date.now()
  const currentTime = new Date(Date.now());
  const webhookURI = process.env.TUTORSCHEDULE_OUTLOOK_FLOW_URI;
  
  //todo: replace with current time
  const requestBody = {
    starttime: currentTime,
    endtime: currentTime
  }
  
  //send post to location
  const response = await axios.post(webhookURI, requestBody)
  const data = response.data
  const availableTutorEvents = []

  //iterate over the subject calendars
  Object.keys(data).forEach(subject => {
    data[subject].forEach(availableTutor => {
      availableTutor["tutoringSubject"] = subject
      availableTutorEvents.push(availableTutor)
    })
  })

  return availableTutorEvents

};