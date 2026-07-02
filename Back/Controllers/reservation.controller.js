const { pool } = require("../Database/mySQL");

async function getReservationPage(req, res) {
    try {

        const [concerts] = await pool.query(`
            SELECT 
                c.id,
                c.ville,
                c.lieu,
                DATE_FORMAT(c.date, '%d/%m/%Y') AS date,
                p.stock,
                p.prix
            FROM concert c
            JOIN places p ON p.id_concert = c.id
            ORDER BY c.date ASC
        `);

        res.render("reservation", {
            titre : "Toutes les dates",
            concerts
        });

      

    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur serveur");
    }
}

module.exports = {
    getReservationPage
};