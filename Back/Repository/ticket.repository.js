const prisma = require("../Database/prisma");


async function getTicket(ticketId, userId) {

    return prisma.billets.findFirst({

        where:{
            id:Number(ticketId),

            commandes:{
                id_user:Number(userId)
            }
        },

        include:{
            concert:true,

            commandes:{
                include:{
                    users:{
                        select:{
                            email:true,
                            nom:true,
                            prenom:true
                        }
                    }
                }
            }
        }

    });

}


module.exports = {
    getTicket
};