const cartRepository = require("../Repository/cart.repository");

async function add(userId, data) {
    const { concertId, quantity } = data;

    if (!concertId || !quantity) {
        throw new Error("Données manquantes");
    }

    if (quantity <= 0) {
        throw new Error("Quantité invalide");
    }

    const existingItem = await cartRepository.getItem(
        userId,
        concertId,
    );

    if (existingItem) {
        await cartRepository.updateQuantity(
            existingItem.id,
            existingItem.quantity + quantity
        );
    } else {
        await cartRepository.addItem(
            userId,
            concertId,
            quantity
        );
    }

    return {
        message: "Ajout au panier réussi"
    };
}

module.exports = {
    add
};