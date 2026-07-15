const prisma = require("../Database/prisma");

async function getConcerts() {

    const concerts = await prisma.concert.findMany({
        include: {
            places: true
        },
        
        orderBy: {
            date: "asc"
        }
    });

    return concerts.map(concert => ({

        ...concert,
        formatedDate:
            concert.date.toLocaleDateString("fr-FR")
    })
    )  
}

module.exports = {
    getConcerts
};