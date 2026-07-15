const prisma = require("../Database/prisma");


async function getCartItems(userId) {

    const items = await prisma.cart_items.findMany({
        where:{
            user_id:userId,
            status:"active"
        },
        include:{
            concert:true
        }
    });

    return items.map(item => ({
        id:item.id,
        concert_id:item.concert_id,
        quantity:item.quantity,
        price:item.price,
        total:item.total,
        ville:item.concert.ville,
        lieu:item.concert.lieu,
        date:item.concert.date ? item.concert.date.toLocaleDateString("fr-FR") : "-"
    }));
}

async function getItem(userId, concertId) {
    
    return prisma.cart_items.findFirst({
        where: {
            user_id: userId,
            concert_id: concertId,
            status: "active"
        }
    });
}

async function addItem(userId, concertId, quantity, price) {

    return prisma.cart_items.create({
        data: {
            user_id: userId,
            concert_id: concertId,
            quantity,
            price,
            total: new Prisma.Decimal(price).mul(quantity),
            status: "active"
        }
    });
}
    
async function updateQuantity(id, quantity) {

    return prisma.cart_items.update({
        where: {
            id: Number(id)
        },
        data: {
            quantity
        }
    });
}

async function deleteItem(userId, cartId) {

    return prisma.cart_items.deleteMany({

        where:{
            id:Number(cartId),
            user_id:userId
        }

    });
}

async function getActiveCart(userId){

    return prisma.cart_items.findMany({

        where:{
            user_id:userId,
            status:"active"
        },

        include:{
            concert:true
        }

    });
}

async function clearCart(userId){

    return prisma.cart_items.deleteMany({

        where:{

            user_id:userId,
            status:"active"

        }

    });

}

module.exports = {
    getItem,
    addItem,
    updateQuantity,
    getCartItems,
    deleteItem,
    getActiveCart,
    clearCart
};