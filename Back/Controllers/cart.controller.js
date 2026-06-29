const cartService = require("../Services/cart.service");

async function add(req, res) {
    try {
        const userId = req.session.user.id;

        const result = await cartService.add(
            userId,
            req.body
        );

        res.status(201).json(result);

    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
}

module.exports = {
    add
};