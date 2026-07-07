const express = require("express");
const router = express.Router();
const adminController = require("../Controllers/admin.controller");
const authMiddleware = require("../Middleware/auth.middleware");

router.post("/concerts", authMiddleware.isAuthenticated, authMiddleware.isAdmin, adminController.createConcert);
router.put("/concerts/:id", authMiddleware.isAuthenticated, authMiddleware.isAdmin, adminController.updateConcert);
router.delete("/concerts/:id", authMiddleware.isAuthenticated, authMiddleware.isAdmin, adminController.deleteConcert);

module.exports = router;