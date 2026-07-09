const express = require('express');
const router = express.Router();
const authMiddleware = require("../Middleware/auth.middleware");
const cartController = require ("../Controllers/cart.controller");
const commandeController = require ("../Controllers/commandes.controller");

router.get("/", authMiddleware.isAuthenticated, cartController.cartPage);

router.post("/add", authMiddleware.isAuthenticated, cartController.add);

router.patch("/:id", cartController.updateQuantityInCart);

router.delete("/:id", cartController.removeItem);

router.post("/validate", commandeController.validateCart);

module.exports = router;