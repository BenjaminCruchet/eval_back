const isAuthenticated = (req, res, next) => {    

    if (req.session.user) {
        return next();
    }

    res.status(401).json({
        message: "Vous devez être connecté pour accéder à cette fonctionnalité"
    });
};


const isAdmin = (req, res, next) => {

if (req.session.user && req.session.user.role === "admin"){
        return next();
}

res.status(403).json({
    message: "Accès administrateur requis"
});
};

module.exports = {
isAuthenticated,
isAdmin
};