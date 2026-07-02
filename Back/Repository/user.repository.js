const { pool } = require("../Database/mySQL");

async function findByEmail(email) {
    const [rows] = await pool.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );

    return rows[0] || null;
}

module.exports = {
    findByEmail
};