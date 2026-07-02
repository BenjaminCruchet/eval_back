const express = require('express');
const router = express.Router();
const reservationController = require('../Controllers/reservation.controller');
const cartService = require('../Services/cart.service');

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/reservation', reservationController.getReservationPage);


router.get('/', (req,res) => {
    res.render('index');
})

module.exports = router;