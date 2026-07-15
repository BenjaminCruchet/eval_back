const bcrypt = require("bcrypt");
const userRepository = require("../Repository/user.repository");
const logs = require("./log.service");

async function register(data) {

    const { email, password } = data;

    if (!email || !password) {
        throw new Error("Tous les champs sont obligatoires");
    }

    const existingUser = await userRepository.getUserByEmail(email);

    if (existingUser) {
        throw new Error("Email déjà utilisé");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userRepository.createUser(email, hashedPassword);

    await logs.register(user.id, email);

    return {
        message: "Utilisateur créé avec succès"
    };
}

module.exports = {
    register
};