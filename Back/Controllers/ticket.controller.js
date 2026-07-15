const PDFDocument = require("pdfkit");

const ticketService = require("../Services/ticket.service");

async function download(req, res) {

    console.log("DOWNLOAD TICKET APPELÉ", req.params.id);

    try {

        const ticket = await ticketService.download(req.params.id, req.session.user.id);
        console.log("USER SESSION :", req.session.user);
        console.log("TICKET :", ticket);

        const doc = new PDFDocument();

        res.setHeader(
            "Content-Disposition",
            `attachment; filename=billet-${ticket.id}.pdf`
        );

        res.setHeader(
            "Content-Type",
            "application/pdf"
        );

        doc.pipe(res);

        doc.fontSize(24)
            .text("ABGYhuDJ TOUR");

        doc.moveDown();

        doc.fontSize(14)
            .text(`Concert : ${ticket.concert.ville}`);

        doc.text(`Salle : ${ticket.concert.lieu}`);

        doc.text(`Date : ${ticket.concert.date.toLocaleDateString("fr-FR")}`);

        doc.moveDown();

        doc.text(`Nom : ${ticket.commandes.users.firstname} ${ticket.commandes.users.lastname}`);

        doc.text(`Nombre de places : ${ticket.quantity}`);

        doc.text(`Prix : ${ticket.prix} €`);

        doc.moveDown();

        doc.text(`Commande #${ticket.commandes.id}`);

        doc.end();

    }

    catch(err){

    console.error(err);

    res.status(500).send(err.message);

}

}

module.exports = {
    download
};