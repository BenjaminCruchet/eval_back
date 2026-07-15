const reservationRepository = require("../Repository/reservation.repository");

async function getReservationPage(){
    
    return reservationRepository.getConcerts();
}

module.exports = {
    getReservationPage
};