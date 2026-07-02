const {pool} = require("../Database/mySQL");
const bcrypt = require("bcrypt");
const logs = require("./log.service");

async function register(data) {
    const { email, password } = data;

    if (!email || !password) {
        throw new Error("Tous les champs sont obligatoires");
    }

    const [users] = await pool.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );

    if (users.length > 0) {
        throw new Error("Email déjà utilisé");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
        "INSERT INTO users (email, password) VALUES (?, ?)",
        [email, hashedPassword]
    );

    return { message: "Utilisateur créé avec succès" };
    
}

module.exports = {
    register
};