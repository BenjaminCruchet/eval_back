const cartRepository = require("../Repository/cart.repository");
const concertRepository = require("../Repository/concerts.repository");
const logs = require("./log.service");


async function add(userId, data) {

    const { concertId, quantity } = data;

    if(!concertId || !quantity){
        throw new Error("Données manquantes");
    }

    if(quantity <= 0){
        throw new Error("Quantité invalide");
    }

    const concert = await concertRepository.getConcertById(concertId);

    if(!concert){
        throw new Error("Concert introuvable");
    }

    if(quantity > concert.stock){
        throw new Error("Stock insuffisant");
    }

    const existingItem = await cartRepository.getItem(userId, Number(concertId));

    if(existingItem){

        await cartRepository.updateQuantity(
            existingItem.id,
            existingItem.quantity + Number(quantity)
        );

    } else {

        await cartRepository.addItem(
            userId,
            Number(concertId),
            Number(quantity),
            concert.prix
        );

    }

    await logs.addCart(
        userId,
        concertId,
        quantity
    );

    return {
        message:"Ajout au panier réussi"
    };
}

async function getCart(userId){

    return cartRepository.getCartItems(userId);
}

async function updateQuantity(userId, cartId, quantity){


    const result = await cartRepository.updateQuantity(cartId, quantity);

    await logs.updateCart(userId, cartId, quantity);

    return result;
}

async function removeItem(userId, cartId){


    const result = await cartRepository.deleteItem(userId, cartId);

    await logs.removeCart(userId, cartId);

    return result;
}

async function clearCart(userId){

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