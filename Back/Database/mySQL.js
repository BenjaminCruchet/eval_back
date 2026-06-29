const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    namedPlaceholders: true
});


async function testMySQL() {
    try {
        const [rows] = await pool.query("SELECT 1");
        console.log("MySQL connecté");
        return true;
    } catch (err) {
        console.error("Erreur MySQL :", err);
        throw err;
    }
};

module.exports = {
    pool,
    testMySQL
}