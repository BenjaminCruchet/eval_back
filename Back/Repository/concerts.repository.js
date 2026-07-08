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
        stock: concert.places[0]?.stock,
        prix: concert.places[0]?.prix
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
        stock: concert.places[0]?.stock,
        prix: concert.places[0]?.prix,
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

    await prisma.concert.update({
        where:{
            id:Number(id)
        },
        data:{
            ville,
            lieu,
            date:new Date(date)
        }
    });


    await prisma.places.update({
        where:{
            id_concert:Number(id)
        },
        data:{
            stock:Number(stock),
            prix:Number(prix)
        }
    });
}

async function deleteConcert(id){

    await prisma.places.deleteMany({
        where:{
            id_concert:Number(id)
        }
    });


    await prisma.concert.delete({
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