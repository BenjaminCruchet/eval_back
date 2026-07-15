const registerService = require("../Services/register.service");
const loginService = require("../Services/login.service");

const register = async (req, res) => {
 console.log("REGISTER BODY :", req.body);
    try {
    
        const result = await registerService.register(req.body);

        res.status(201).json(result);

    } catch (err) {

        res.status(400).json({ 
            message: err.message 
        });
    }
};

const login = async (req, res) => {

    try {

        await loginService.login(req.body, req.session);

        return res.json({
            success:true
        });
        
    } catch (err) {

        res.status(401).json({ 
            message: err.message 
        });
    }
};

function logout(req, res) {

    req.session.destroy(() => {
        return res.redirect(req.headers.referer || "/");
    });
}

function getCurrentUser(req, res) {

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