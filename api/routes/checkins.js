const express = require("express");
const router = express.Router();

const CheckInsController = require('../controllers/checkins')

//Routes
router.post("/", CheckInsController.checkins_create);
router.get("/", CheckInsController.checkins_get);

module.exports = router;