const concertRepository = require("../Repository/concerts.repository");

async function getAllConcerts() {
    return await concertRepository.getAllConcerts();
}

module.exports = {
    getAllConcerts
};