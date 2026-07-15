const ticketRepository = require("../Repository/ticket.repository");

async function download(ticketId, userId) {

    const ticket = await ticketRepository.getTicket(ticketId, userId);

    if (!ticket) {
        throw new Error("Billet introuvable");
    }

    if (!ticket.commandes || ticket.commandes.id_user !== Number(userId)) {
        throw new Error("Accès interdit");
    }

    return ticket;
}


module.exports = {
    download
};