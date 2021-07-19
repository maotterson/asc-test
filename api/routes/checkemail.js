const express = require("express");
const router = express.Router();


const CheckEmailController = require('../controllers/checkemail');

//Routes
router.post("/", CheckEmailController.check_tutor_email);

module.exports = router;