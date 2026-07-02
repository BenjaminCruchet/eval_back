const { getDb } = require('../Database/mongoDB');

async function logEvent(data) {

    const db = getDb();

    await db.collection('logs').insertOne({
        ...data,
        createdAt: new Date()
    });
}

function login(userId) {
    return logEvent({ type: "LOGIN", userId });
}

function logout(userId) {
    return logEvent({ type: "LOGOUT", userId });
}

function addCart(userId, concertId, quantity) {
    return logEvent({
        type: "ADD_CART",
        userId,
        concertId,
        quantity
    });
}

function removeCart(userId, cartItemId) {
    return logEvent({
        type: "REMOVE_CART",
        userId,
        cartItemId
    });
}

function updateCart(userId, cartItemId, quantity) {
    return logEvent({
        type: "UPDATE_CART",
        userId,
        cartItemId,
        quantity
    });
}

module.exports = {
    logEvent,
    login,
    logout,
    addCart,
    removeCart,
    updateCart
};
