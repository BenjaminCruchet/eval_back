const prisma = require("../Database/prisma");

async function createCommande(data, tx = prisma){

    return tx.commandes.create({
        data
    });

}

async function createBillets(data, tx = prisma){

    return tx.billets.createMany({
        data
    });

}

module.exports = {
    createCommande,
    createBillets
};