const concertRepository = require("../Repository/concerts.repository");

async function getAllConcerts() {
    return concertRepository.getAllConcerts();
}

async function createConcert(data) {
    return concertRepository.createConcert(data);
}

async function updateConcert(id, data) {
    return concertRepository.updateConcert(id, data);
}

async function deleteConcert(id) {
    return concertRepository.deleteConcert(id);
}

module.exports = {
    getAllConcerts,
    createConcert,
    updateConcert,
    deleteConcert
};
