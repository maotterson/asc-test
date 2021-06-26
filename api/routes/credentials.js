const express = require("express");
const router = express.Router();


const CredentialsController = require('../controllers/credentials');

//Routes
router.post("/", CredentialsController.credentials_check);


module.exports = router;