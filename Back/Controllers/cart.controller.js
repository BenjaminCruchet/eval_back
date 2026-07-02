
const cartService = require("../Services/cart.service");

async function add(req, res) {
    try {
        const userId = req.session.user.id;
        const result = await cartService.add(userId, req.body);
        return res.status(201).json(result);
    } catch (err) {

        return res.status(500).json({
            message: err.message
        });
    }
}

async function cartPage(req, res) {
   try {
        const userId = req.session.user.id;

        const items = await cartService.getCart(userId);

        res.render("cart", {
            titre : "Mon panier",
            items: items || []
        });

    } catch (err) {
        console.error(err);

        res.render("cart", {
            titre : "Mon panier",
            items: []
        });
    }
}

async function updateQuantityInCart(req, res) {
    const userId = req.session.user.id;
    const cartId = Number(req.params.id);
    const { quantity } = req.body;

    await cartService.updateQuantity(userId, cartId, quantity);

    res.json({ message: "updated" });
}

async function removeItem(req, res) {
    console.log("DELETE HIT", req.params.id)
    try {
        const userId = req.session.user.id;
        const cartId = Number(req.params.id);

        await cartService.removeItem(userId, cartId);

        res.json({ message: "Item supprimé du panier" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur serveur" });
    }
}


module.exports = {
    add,
    cartPage,
    updateQuantityInCart,
    removeItem
};