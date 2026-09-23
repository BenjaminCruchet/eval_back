const cartRepository = require("../Repository/cart.repository");
const prisma = require("../Database/prisma");

async function validateOrder(userId) {
    const cart = await cartRepository.getActiveCart(userId);

    if(cart.length === 0){
        throw new Error("Panier vide");
    }

    return prisma.$transaction(async(tx) => {
        let total = 0;

        for(const item of cart){
            const stockUpdate = await tx.places.updateMany({
                where:{
                    id_concert:item.concert_id,
                    stock:{
                        gte:item.quantity
                    }
                },
                data:{
                    stock:{
                        decrement:item.quantity
                    }
                }
            });

            if(stockUpdate.count !== 1){
                throw new Error(
                    `Stock insuffisant pour le concert ${item.concert_id}`
                );
            }

            total += Number(item.price) * item.quantity;
        }

        const commande = await tx.commandes.create({
            data:{
                id_user:userId,
                total
            }
        });

        await tx.billets.createMany({
            data:cart.map(item => ({
                id_commande:commande.id,
                id_concert:item.concert_id,
                quantity:item.quantity,
                prix:item.price
            }))
        });

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

module.exports = {
    validateOrder
};