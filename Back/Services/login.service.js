const bcrypt = require("bcrypt");
const userRepository = require("../Repository/user.repository");
const logs = require("./log.service");

async function login(data, session) {
    const { email, password } = data;

    if (!email || !password) {
        throw new Error("Tous les champs sont obligatoires");
    }

    const user = await userRepository.findByEmail(email);

    if (!user) {
        throw new Error("Adresse mail ou mot de passe incorrect");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Adresse mail ou mot de passe incorrect");
    }

    session.user = {
        id: user.id,
        email: user.email,
        role: user.role
    };

    await logs.login(user.id);

    return {
        message: "Connexion réussie",
        user: session.user
    };
}

module.exports = {
    login
};