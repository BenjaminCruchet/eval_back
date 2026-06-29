const { getDb } = require("../Database/mongoDB");

async function logVisit(route, method, sessionId, userId = null) {

    const db = getDb();

    await db.collection("visits").insertOne({
        route,
        method,
        sessionId,
        userId,
        createdAt: new Date()
    });
}