const dotenv = require('dotenv').config();
const axios = require('axios');
const { getCourseById } = require('./course-information-service');
const { getTutorById } = require('./tutor-information-service');

exports.sendCheckInMessage = async (body) => {
  const checkinid = body._id;
  const course = await getCourseById(body.course);
  const tutor = await getTutorById(body.tutor);
  const webhookURI = process.env.TEAMS_WEBHOOK_URI;
  const selfURI = process.env.SELF_URI;
  const message = {
    "@context": "https://schema.org/extensions",
    "@type": "MessageCard",
    "themeColor": "0072C6",
    "title": "Tutoring Center: Student Incoming",
    "text": `Incoming student for ${course.name}, ${tutor.name}`,
    "potentialAction": [
        {
            "@type": "OpenUri",
            "name": "Check Out",
            "targets": [
                {
                    "os": "default",
                    "uri": `${selfURI}/api/checkins/${checkinid}/checkout`
                }
            ]
        }
    ]
  };

  //send post to location
  await axios.post(webhookURI, message);
  
};