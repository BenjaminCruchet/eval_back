const express = require("express");
const router = express.Router();

const logController = require("../Controllers/log.controller");

router.post("/search", logController.search);

module.exports = router;
