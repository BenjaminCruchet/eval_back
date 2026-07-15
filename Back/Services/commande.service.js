const cartRepository = require("../Repository/cart.repository");
const prisma = require("../Database/prisma");

async function validateOrder(userId){


    const cart = await cartRepository.getActiveCart(userId);

    if(cart.length === 0){
        throw new Error("Panier vide");
    }

    return prisma.$transaction(async(tx)=>{

        const total = cart.reduce(
            (sum,item)=> sum + Number(item.total),
            0
        );

        const commande = await tx.commandes.create({
            data:{
                id_user:userId,
                total
            }
        });

        await tx.billets.createMany({

            data: cart.map(item=>({
                id_commande:commande.id,
                id_concert:item.concert_id,
                quantity:item.quantity,
                prix:item.price
            }))
        });


        for(const item of cart){

            await tx.places.update({

                where:{
                    id_concert:item.concert_id
                },

                data:{
                    stock:{
                        decrement:item.quantity
                    }
                }
            });
        }

        await tx.cart_items.updateMany({

            where:{
                user_id:userId,
                status:"active"
            },

            data:{
                status:"converted"
            }
        });

        return commande;
    });
}

module.exports={
    validateOrder
};