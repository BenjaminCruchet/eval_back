const reservationService = require("../Services/reservation.service");

async function getReservationPage(req,res){

    try{

        const concerts = await reservationService.getReservationPage();

        res.render("reservation",{
            titre:"Toutes les dates",
            concerts,
        });

    }catch(err){

        console.error(err);

        res.status(500).render("reservation",{
            titre:"Toutes les dates",
            concerts:[]
        });
    }
}

async function search(req, res) {

    try {
        const userId = req.session.user?.id || null;
        const { query } = req.body;

        await logs.search(userId, query);

        res.status(204).send();


    } catch(err) {

        console.error(err);

        res.status(500).json({
            message:"Erreur log recherche"
        });
    }
}

module.exports = {
    getReservationPage,
    search
};