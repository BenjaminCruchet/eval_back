const prisma = require("../Database/prisma");

async function getAllConcerts() {

    const concerts = await prisma.concert.findMany({
        include:{
            places:true
        }
    });

    return concerts.map(concert => ({
        ...concert,
        formatedDate: concert.date.toLocaleDateString("fr-FR"),
        stock: concert.places?.stock,
        prix: concert.places?.prix
    }));
}

async function getConcertById(id) {

    const concert = await prisma.concert.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            places: true
        }
    });

    if (!concert) return null;

    return {
        ...concert,
        stock: concert.places?.stock,
        prix: concert.places?.prix,
        formatedDate: concert.date.toLocaleDateString("fr-FR")
    };
}

async function createConcert(data) {

    const { ville, lieu, date, stock, prix } = data;

    return prisma.concert.create({
        data: {
            ville,
            lieu,
            date: new Date(date),
            places: {
                create: {
                    stock: Number(stock),
                    prix: Number(prix)
                }
            }
        },
        
        include: {
            places: true
        }
    });
}

async function updateConcert(id, data) {

    const { ville, lieu, date, stock, prix } = data;

    return prisma.$transaction(async (tx) => {

        const concert = await tx.concert.update({

            where:{
                id:Number(id)
            },

            data:{
                ville,
                lieu,
                date:new Date(date)
            }
        });


        const place = await tx.places.update({

            where:{
                id_concert:Number(id)
            },

            data:{
                stock:Number(stock),
                prix:Number(prix)
            }
        });

        return {
            concert,
            place
        };
    });

}

async function deleteConcert(id){

    return prisma.concert.delete({
        where:{
            id:Number(id)
        }
    });

}

module.exports = {
    getAllConcerts,
    getConcertById,
    createConcert,
    updateConcert,
    deleteConcert
};