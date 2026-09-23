const reservationService = require("../Services/reservation.service");

async function getReservationPage(req,res) {
    try {
        const concerts = await reservationService.getReservationPage();

        res.render("reservation", {
            titre:"Toutes les dates",
            concerts
        });

    } catch(err) {
        console.error(err);

        res.status(500).render("reservation", {
            titre:"Toutes les dates",
            concerts:[]
        });
    }
}

module.exports = {
    getReservationPage
};

