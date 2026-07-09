const prisma = require("../Database/prisma");


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


module.exports = {
    getUserAccount
};