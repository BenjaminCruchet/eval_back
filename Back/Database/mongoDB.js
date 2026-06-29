const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;

let client;
let db;

async function connectMongo() {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db("logsDB");
    console.log("MongoDB connecté");
}

function getDb() {
    if (!db) {
        throw new Error("MongoDB non connecté");
    }
    return db;
}

module.exports = {
    connectMongo,
    getDb
};