const prisma = require("../Database/prisma");

async function findByEmail(email) {

    return prisma.users.findUnique({
        where: {
            email: email
        }
    });

}

module.exports = {
    findByEmail
};