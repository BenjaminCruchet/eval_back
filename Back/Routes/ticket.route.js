const express = require("express");
const router = express.Router();
const ticketController = require("../Controllers/ticket.controller");
const authMiddleware = require('../Middleware/auth.middleware');

router.get("/:id/download", authMiddleware.isAuthenticated, ticketController.download);

module.exports = router;