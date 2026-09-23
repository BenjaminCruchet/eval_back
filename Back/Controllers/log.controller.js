const logs = require("../Services/log.service");

async function search(req, res) {
    try {
        const userId = req.session.user?.id || null;
        const { query } = req.body;

        if(!query || !query.trim()){
            return res.status(400).json({
                message:"Recherche vide"
            });
        }

        await logs.search(userId, query.trim());

        return res.status(204).send();

    } catch(err) {
        console.error(err);

        return res.status(500).json({
            message:"Erreur lors de l'enregistrement de la recherche"
        });
    }
}

module.exports = {
    search
};
