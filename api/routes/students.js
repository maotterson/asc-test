const express = require("express");
const router = express.Router();

const StudentsController = require('../controllers/students')

//Routes
router.get("/", StudentsController.students_get_all);
router.post("/:studentid/checkout/", StudentsController.checkout);

module.exports = router;