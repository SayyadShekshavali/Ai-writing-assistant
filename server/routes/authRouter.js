const { googlelogin } = require("../controllers/authcontroller.js");

const express = require("express");
const router = express.Router();

router.get("/auth", googlelogin);

module.exports = router;
