const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/check-auth")

const CheckInsController = require('../controllers/checkins');

//Routes
router.post("/", checkAuth, CheckInsController.checkins_create);
router.get("/", CheckInsController.checkins_get);
router.get("/:checkinid/checkout/", CheckInsController.checkout); //should eventually become a post

module.exports = router;