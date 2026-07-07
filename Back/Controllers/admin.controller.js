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

async function createConcert(req, res) {
    try {
        const result = await adminService.createConcert(req.body);
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function updateConcert(req, res) {
    try {
        const result = await adminService.updateConcert(req.params.id, req.body);
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function deleteConcert(req, res) {
    try {
        await adminService.deleteConcert(req.params.id);
        res.json({ message: "Concert supprimé" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    adminPage,
    createConcert,
    updateConcert,
    deleteConcert
};
