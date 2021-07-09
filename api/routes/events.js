const express = require("express");
const router = express.Router();


const EventsController = require('../controllers/events');

//Routes
router.post("/", EventsController.add_event);


module.exports = router;