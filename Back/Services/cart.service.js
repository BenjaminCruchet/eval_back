const cartRepository = require("../Repository/cart.repository");
const logs = require("./log.service");

async function add(userId, data) {
    const { concertId, quantity, price } = data;

    if (!concertId || !quantity || !price) {
        throw new Error("Données manquantes");
    }

    if (quantity <= 0) {
        throw new Error("Quantité invalide");
    }

    const existingItem = await cartRepository.getItem(
        userId,
        concertId,
    );
    console.log("existingItem :", existingItem);

    if (existingItem) {
        await cartRepository.updateQuantity(
            existingItem.id,
            existingItem.quantity + quantity
        );
    } else {
        
        await cartRepository.addItem(
            userId,
            concertId,
            quantity,
            price
        );
    }
    await logs.addCart(userId, concertId, quantity);
    return {
        message: "Ajout au panier réussi"
    };

}

async function getCart(userId) {
    return await cartRepository.getCartItems(userId);
}

async function updateQuantity(userId, cartId, quantity) {
    await logs.updateCart(userId, cartId, quantity);
    return cartRepository.updateQuantity(cartId, quantity);
}

async function removeItem(userId, cartId) {
    await logs.removeCart(userId, cartId);
    return cartRepository.deleteItem(userId, cartId);
}

module.exports = {
    add,
    getCart,
    updateQuantity,
    removeItem
};