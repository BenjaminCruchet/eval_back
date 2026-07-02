const express = require('express');
const router = express.Router();
const authMiddleware = require("../Middleware/auth.middleware");
const cartController = require ("../Controllers/cart.controller");


/* route classique*/
router.get(
    "/",
    authMiddleware.isAuthenticated,
    cartController.cartPage
);

/*ajout ligne*/
router.post(
    "/add",
    authMiddleware.isAuthenticated,
    cartController.add
);

/* modif dans le cart */
router.patch("/:id", cartController.updateQuantityInCart);

/* suppress dans le cart */
router.delete("/:id", cartController.removeItem);

module.exports = router;