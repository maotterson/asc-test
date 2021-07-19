const jwt = require("jsonwebtoken");
const axios = require("axios");
const path = require("path")
const { isValidTutorToken, generateTutorAvailToken } = require("../../api/services/token-service");

// Check credentials for student
exports.get_availability_form = async (req, res, next) => {
  const token = req.query.token
  const isvalid = await isValidTutorToken(token)
  if(!token){
    return res.status(500).send(
      "Bad token"
    )
  }
  return res.sendFile(path.join(process.cwd(), './pages/availability/index.html'));
};
