const express = require('express');
const router = express.Router();
const accountController = require('../Controllers/account.controller');
const authMiddleware = require("../Middleware/auth.middleware");

router.patch("/", authMiddleware.isAuthenticated, accountController.updateAccount);

router.patch("/password", authMiddleware.isAuthenticated, accountController.updatePassword);

module.exports = router;