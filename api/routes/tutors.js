const express = require("express");
const router = express.Router();


const TutorsController = require('../controllers/tutors');
const checkTutorAuth = require('../middleware/check-auth-tutors')

//Routes
router.post("/:tutorid/courses/", checkTutorAuth, TutorsController.edit_courses);
router.post("/:tutorid/availform/", checkTutorAuth, TutorsController.submit_avail_form)

module.exports = router;