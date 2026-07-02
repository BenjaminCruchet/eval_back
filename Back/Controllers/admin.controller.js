const adminService = require("../Services/admin.service");

async function adminPage(req, res) {
    try {
        const concerts = await adminService.getAllConcerts();
        res.render('admin', {
            titre : "Page administrateur",
            concerts
        });

    } catch (err) {
        console.error(err);

        res.render("admin", {
            titre : "Page administrateur",
            concerts: []
        });
    }
}

module.exports = {
    adminPage
};