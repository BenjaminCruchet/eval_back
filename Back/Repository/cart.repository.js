const { pool } = require("../Database/mySQL");

// récupérer un item existant
async function getItem(userId, concertId) {
    const [rows] = await pool.query(
        `SELECT * FROM cart_items 
         WHERE user_id = ? AND concert_id = ?`,
        [userId, concertId]
    );

    return rows[0];
}

// ajouter
async function addItem(userId, concertId, quantity) {
    await pool.query(
        `INSERT INTO cart_items (user_id, concert_id, quantity)
         VALUES (?, ?, ?)`,
        [userId, concertId, quantity]
    );
}

// update quantité
async function updateQuantity(id, quantity) {
    await pool.query(
        `UPDATE cart_items SET quantity = ? WHERE id = ?`,
        [quantity, id]
    );
}

module.exports = {
    getItem,
    addItem,
    updateQuantity
};