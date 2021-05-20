const express = require("express");
const router = express.Router();

const CheckInsController = require('../controllers/checkins')

//Routes
router.post("/", CheckInsController.checkins_create);

module.exports = router;