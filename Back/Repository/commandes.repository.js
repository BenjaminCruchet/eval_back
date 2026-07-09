const prisma = require("../Database/prisma");

async function createCommande(data) {

    return prisma.commandes.create({
        data
    });

}

async function createBillets(data) {

    return prisma.billets.createMany({
        data
    });

}

module.exports = {
    createCommande,
    createBillets
};