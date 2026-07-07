const { pool } = require('../Database/mySQL');

async function getAllConcerts() {
    const [rows] = await pool.query(`
        SELECT 
            c.id,
            c.ville,
            c.lieu,
            c.date,
            DATE_FORMAT(c.date, '%d/%m/%Y') AS formatedDate,
            p.stock,
            p.prix
        FROM concert c
        LEFT JOIN places p ON p.id_concert = c.id
        ORDER BY c.date ASC
    `);

    return rows;
}

async function getConcertById(id) {
    const [rows] = await pool.query(`
        SELECT 
            c.id,
            c.ville,
            c.lieu,
            c.date,
            DATE_FORMAT(c.date, '%d/%m/%Y') AS formatedDate,
            p.stock,
            p.prix
        FROM concert c
        LEFT JOIN places p ON p.id_concert = c.id
        WHERE c.id = ?
    `, [id]);

    return rows[0] || null;
}

async function createConcert(data) {
    const { ville, lieu, date, stock, prix } = data;

    const [result] = await pool.query(
        "INSERT INTO concert (ville, lieu, date) VALUES (?, ?, ?)",
        [ville, lieu, date]
    );

    await pool.query(
        "INSERT INTO places (id_concert, stock, prix) VALUES (?, ?, ?)",
        [result.insertId, stock, prix]
    );

    return result;
}

async function updateConcert(id, data) {
    const { ville, lieu, date, stock, prix } = data;

    await pool.query(
        "UPDATE concert SET ville=?, lieu=?, date=? WHERE id=?",
        [ville, lieu, date, id]
    );

    await pool.query(
        "UPDATE places SET stock=?, prix=? WHERE id_concert=?",
        [stock, prix, id]
    );
}

async function deleteConcert(id) {
    await pool.query("DELETE FROM concert WHERE id = ?", [id]);
}

module.exports = {
    getAllConcerts,
    getConcertById,
    createConcert,
    updateConcert,
    deleteConcert
};