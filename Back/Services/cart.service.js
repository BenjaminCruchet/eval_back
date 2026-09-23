const cartRepository = require("../Repository/cart.repository");
const concertRepository = require("../Repository/concerts.repository");
const logs = require("./log.service");

async function add(userId, data) {
    const { concertId, quantity } = data;
    const parsedQuantity = Number(quantity);

    if(!concertId || !quantity){
        throw new Error("Données manquantes");
    }

    if(!Number.isInteger(parsedQuantity) || parsedQuantity <= 0){
        throw new Error("Quantité invalide");
    }

    const concert = await concertRepository.getConcertById(concertId);

    if(!concert){
        throw new Error("Concert introuvable");
    }

    const existingItem = await cartRepository.getItem(userId, Number(concertId));
    const quantityInCart = existingItem ? existingItem.quantity : 0;
    const newQuantity = quantityInCart + parsedQuantity;

    if(newQuantity > concert.stock){
        throw new Error("Stock insuffisant");
    }

    if(existingItem){
        const total = Number(existingItem.price) * newQuantity;

        await cartRepository.updateQuantity(
            existingItem.id,
            newQuantity,
            total
        );
    } else {
        await cartRepository.addItem(
            userId,
            Number(concertId),
            parsedQuantity,
            concert.prix
        );
    }

    await logs.addCart(
        userId,
        concertId,
        parsedQuantity
    );

    return {
        message:"Ajout au panier réussi"
    };
}

async function getCart(userId) {
    return cartRepository.getCartItems(userId);
}

async function updateQuantity(userId, cartId, quantity) {
    const parsedQuantity = Number(quantity);

    if(!Number.isInteger(parsedQuantity) || parsedQuantity <= 0){
        throw new Error("Quantité invalide");
    }

    const item = await cartRepository.getItemById(userId, cartId);

    if(!item){
        throw new Error("Article du panier introuvable");
    }

    const concert = await concertRepository.getConcertById(item.concert_id);

    if(!concert){
        throw new Error("Concert introuvable");
    }

    if(parsedQuantity > concert.stock){
        throw new Error("Stock insuffisant");
    }

    const total = Number(item.price) * parsedQuantity;

    const result = await cartRepository.updateQuantity(
        item.id,
        parsedQuantity,
        total
    );

    await logs.updateCart(
        userId,
        cartId,
        parsedQuantity
    );

    return result;
}

async function removeItem(userId, cartId) {
    const result = await cartRepository.deleteItem(userId, cartId);

    await logs.removeCart(userId, cartId);

    return result;
}

async function clearCart(userId) {
    const result = await cartRepository.clearCart(userId);

    await logs.clearCart(userId);

    return result;
}

module.exports = {
    add,
    getCart,
    updateQuantity,
    removeItem,
    clearCart
};

