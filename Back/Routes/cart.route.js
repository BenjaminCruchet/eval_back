const express = require('express');
const router = express.Router();
const authMiddleware = require("../Middleware/auth.middleware");
const cartController = require ("../Controllers/cart.controller");

router.post(
    "/add",
    authMiddleware.isAuthenticated,
    cartController.add
);

module.exports = router;