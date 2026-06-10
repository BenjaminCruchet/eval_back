const bcrypt = require("bcrypt");
const db = require("../Database/db");

// INSCRIPTION UTILISATEUR

const register = async (req, res) => {

try {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: "Tous les champs sont obligatoires"
        });
    }

    const checkQuery = `SELECT * FROM users WHERE email = ?`;

    db.query(checkQuery, [email], async (error, results) => {
        if (error) {
            return res.status(500).json(error);
        }

        if (results.length > 0) {
            return res.status(409).json({
                message: "Email déjà utilisé"
            });
        }

        // HASH MOT DE PASSE

        const hashedPassword = await bcrypt.hash(password, 10);

        // INSERTION UTILISATEUR

        const insertQuery = `INSERT INTO users (email, password) VALUES (?, ?, ?)
        `;

        db.query(
            insertQuery,
            [email, hashedPassword],
            (error, result) => {

                if (error) {
                    return res.status(500).json(error);
                }
                res.status(201).json({
                    message: "Utilisateur créé avec succès"
                });
            }
        );
    });

} catch (error) {
    res.status(500).json(error);
}
};

// CONNEXION UTILISATEUR


const login = (req, res) => {

    const { email, password } = req.body;

   
    if (!email || !password) {
        return res.status(400).json({
            message: "Tous les champs sont obligatoires"
        });
    }

    
    const query = `SELECT * FROM users WHERE email = ?`;

    db.query(query, [email], async (error, results) => {

        if (error) {
            return res.status(500).json(error);
        }

        if (results.length === 0) {
            return res.status(401).json({
                message: "Aucun compte ne correspond à cet email"
            });
        }

        const user = results[0];

        // VERIFICATION MOT DE PASSE

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Mot de passe incorrect"
            });
        }


    // CREATION SESSION


    req.session.user = {
        id: user.id,
        email: user.email,
        role: user.role
    };


    res.status(200).json({
        message: "Connexion réussie",
        user: req.session.user
    });

});

};


// DECONNEXION

const logout = (req, res) => {

req.session.destroy(() => {
    res.status(200).json({
        message: "Déconnexion réussie"
    });
});

};


// EXPORTS

module.exports = {

register,
login,
logout

};
