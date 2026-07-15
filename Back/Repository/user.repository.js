const prisma = require("../Database/prisma");

async function getUserByEmail(email) {

    return prisma.users.findUnique({
        where: {
            email
        }
    });
}

async function createUser(email, hashedPassword) {

    return prisma.users.create({

        data: {
            email,
            password: hashedPassword
        }

    });

}

async function getUserAccount(userId){

    return prisma.users.findUnique({

        where:{
            id:userId
        },

        include:{
            commandes:{
                include:{
                    billets:{
                        include:{
                            concert:true
                        }
                    }
                }
            }
        }
    });
}

async function updateUser(userId, data) {

    return prisma.users.update({

        where:{
            id:Number(userId)
        },

        data:{
            nom:data.nom,
            prenom:data.prenom,
            email:data.email
        }
    });
}

async function getUserById(id){

    return prisma.users.findUnique({

        where:{
            id:Number(id)
        }
    });
}


async function updatePassword(id,password){

    return prisma.users.update({

        where:{
            id:Number(id)
        },

        data:{
            password
        }

    });

}

async function findByEmail(email) {

    return prisma.users.findUnique({
        where: {
            email: email
        }
    });
}

module.exports = {
    findByEmail,
    getUserAccount,
    updateUser,
    getUserById,
    updatePassword,
    getUserByEmail,
    createUser
};