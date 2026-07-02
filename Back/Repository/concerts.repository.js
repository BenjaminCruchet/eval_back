const { pool } = require('../Database/mySQL');

async function getAllConcerts() {
    const [rows] = await pool.query(`
        SELECT 
            c.id,
            c.ville,
            c.lieu,
            DATE_FORMAT(c.date, '%d/%m/%Y') AS date,
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
            DATE_FORMAT(c.date, '%d/%m/%Y') AS date
            p.stock,
            p.prix
        FROM concert c
        LEFT JOIN places p ON p.id_concert = c.id
        WHERE c.id = ?
    `, [id]);

    return rows[0] || null;
}

module.exports = {
    getAllConcerts,
    getConcertById
};