const dotenv = require('dotenv').config();
const axios = require('axios');

exports.sendCheckInMessage = async (body) => {
  const checkinid = body.checkinid;
  const webhookURI = process.env.TEAMS_WEBHOOK_URI;
  const message = {
    "@context": "https://schema.org/extensions",
    "@type": "MessageCard",
    "themeColor": "0072C6",
    "title": "Tutoring Center: Student Incoming",
    "text": "Incoming student for [[CISS121]], [[@Aidan Bundy]]",
    "potentialAction": [
        {
            "@type": "OpenUri",
            "name": "Check Out",
            "targets": [
                {
                    "os": "default",
                    "uri": `http://localhost:3000/api/checkins/${checkinid}/checkout`
                }
            ]
        }
    ]
  };

  //send post to location
  await axios.post(webhookURI, message);
  
};