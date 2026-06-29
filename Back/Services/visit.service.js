const { getDb } = require('../Database/mongoDB');

async function logVisit(data) {

    const db = getDb();

    await db.collection('visits').insertOne(data);
}

module.exports = {
    logVisit
};