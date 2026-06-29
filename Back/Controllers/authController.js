const registerService = require("../Services/register.service");
const loginService = require("../Services/login.service");

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
        const result = await loginService.login(req.body, req.session);
        return res.redirect("/");
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
};

function logout(req, res) {
    req.session.destroy(() => {
        res.redirect('/');
    });
}

function getCurrentUser(req, res) {

    if (!req.session.user) {
        return res.json({
            authenticated: false
        });
    }

    return res.json({
        authenticated: true,
        user: req.session.user
    });
}

module.exports = {
    register,
    login,
    logout,
    getCurrentUser
};