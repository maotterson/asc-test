const express = require("express");
const router = express.Router();

const FormsController = require('./controllers/forms');

//Routes
router.get("/forms/availability", FormsController.get_availability_form);



module.exports = router;