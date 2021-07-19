const express = require("express");
const router = express.Router();

const FormsController = require('./controllers/forms');

//Routes
router.get("/forms/tutorAvailability", FormsController.get_availability_form);


module.exports = router;