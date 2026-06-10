const registerService = require("../Services/Register.service");
const connectService = require("../Services/Login.service");
const disconnectService = require("../Services/Logout.service");

const register = async (req, res) => {
    try {
        const result = await registerService.register(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const login = async (req, res) => {
    try {
        const result = await connectService.login(req.body, req.session);
        res.status(200).json(result);
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
};

const logout = (req, res) => {
    disconnectService.logout(req.session);
    res.status(200).json({ message: "Déconnexion réussie" });
};

module.exports = {
    register,
    login,
    logout
};