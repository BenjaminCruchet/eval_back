const express = require('express');
const router = express.Router();
const authController = require("../Controllers/auth.controller");
const authMiddleware = require('../Middleware/auth.middleware');

router.post("/register", authController.register);

router.post("/login", authController.login);

router.post("/logout", authController.logout);

router.get("/me", authMiddleware.isAuthenticated, authController.getCurrentUser)

module.exports = router;

