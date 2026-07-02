const { pool } = require("../Database/mySQL");

/* récupérer un item existant */
async function getItem(userId, concertId) {
    const [rows] = await pool.query(
        `SELECT * FROM cart_items 
         WHERE user_id = ? AND concert_id = ?`,
        [userId, concertId]
    );

    return rows[0];
}

/* ajouter */
async function addItem(userId, concertId, quantity, price) {
    await pool.query(
        `INSERT INTO cart_items (user_id, concert_id, quantity, price)
         VALUES (?, ?, ?, ?)`,
        [userId, concertId, quantity, price]
    );
}

/* update quantité from /reservation */
async function updateQuantity(id, quantity) {
    await pool.query(
        `UPDATE cart_items SET quantity = ? WHERE id = ?`,
        [quantity, id]
    );
}

/* affichage */
async function getCartItems(userId) {
    const [rows] = await pool.query(`
        SELECT 
            ci.id,
            ci.concert_id,
            ci.quantity,
            ci.price,
            ci.total,

            c.ville,
            c.lieu,
            DATE_FORMAT(c.date, '%d/%m/%Y') AS date

        FROM cart_items ci
        JOIN concert c ON c.id = ci.concert_id
        WHERE ci.user_id = ? AND ci.status = 'active'
    `, [userId]);

    return rows;
}

/* update quantity */
async function updateQuantityInCart(id, quantity) {
    return pool.query(
        `UPDATE cart_items
         SET quantity = ?, total = price * ?
         WHERE id = ?`,
        [quantity, quantity, id]
    );
}

/*remove item */
async function deleteItem(userId, cartId) {

    console.log("DELETE INPUT:", { userId, cartId });

    const [result] = await pool.query(
        `DELETE FROM cart_items
         WHERE id = ? AND user_id = ?`,
        [cartId, userId]
    );

    console.log("MYSQL RESULT:", result);

    return result;
}

module.exports = {
    getItem,
    addItem,
    updateQuantity,
    getCartItems,
    updateQuantityInCart,
    deleteItem
};