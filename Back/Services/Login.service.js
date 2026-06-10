const db = require("../Database/db");
const bcrypt = require("bcrypt");

async function login(data, session) {
    const { email, password } = data;

    if (!email || !password) {
        throw new Error("Tous les champs sont obligatoires");
    }

    const [users] = await db.promise().query(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );

    if (users.length === 0) {
        throw new Error("Utilisateur introuvable");
    }

    const user = users[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Mot de passe incorrect");
    }

    session.user = {
        id: user.id,
        email: user.email,
        role: user.role
    };

    return {
        message: "Connexion réussie",
        user: session.user
    };
}

module.exports = {
    login
};