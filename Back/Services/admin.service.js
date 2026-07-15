const concertRepository = require("../Repository/concerts.repository");


async function getAllConcerts() {

    return concertRepository.getAllConcerts();

}


async function createConcert(data) {


    const {
        ville,
        lieu,
        date,
        stock,
        prix
    } = data;


    if(!ville || !lieu || !date){
        throw new Error(
            "Les informations du concert sont obligatoires"
        );
    }


    if(Number(stock) <= 0){
        throw new Error(
            "Le stock doit être supérieur à 0"
        );
    }


    if(Number(prix) <= 0){
        throw new Error(
            "Le prix doit être supérieur à 0"
        );
    }


    return concertRepository.createConcert(data);

}


async function updateConcert(id, data) {


    const concert = await concertRepository.getConcertById(id);


    if(!concert){
        throw new Error(
            "Concert introuvable"
        );
    }


    return concertRepository.updateConcert(id, data);

}


async function deleteConcert(id) {


    const concert = await concertRepository.getConcertById(id);


    if(!concert){
        throw new Error(
            "Concert introuvable"
        );
    }


    return concertRepository.deleteConcert(id);

}


module.exports = {
    getAllConcerts,
    createConcert,
    updateConcert,
    deleteConcert
};