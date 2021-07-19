const express = require("express");
const router = express.Router();


const AvailableTutorsController = require('../controllers/availabletutors');

//Routes
router.post("/", AvailableTutorsController.get_available_tutors);


module.exports = router;