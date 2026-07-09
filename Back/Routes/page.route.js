const express = require('express');
const router = express.Router();
const reservationController = require('../Controllers/reservation.controller');
const cartService = require('../Services/cart.service');
const adminController = require('../Controllers/admin.controller');
const authMiddleware = require('../Middleware/auth.middleware');
const authController = require('../Controllers/auth.controller');
const accountController = require('../Controllers/account.controller');

router.get('/register', (req, res) => {
    res.render('register', {
        titre : "S'inscrire"
    });
});

router.get('/reservation', reservationController.getReservationPage);

router.get('/', (req,res) => {
    res.render('index', {
        titre : 'ABGYhuDJ : la tournée'
    });
})

router.get('/admin', authMiddleware.isAuthenticated, authMiddleware.isAdmin, adminController.adminPage);

router.get('/account', authMiddleware.isAuthenticated, accountController.getAccount);


module.exports = router;

module.exports = router;