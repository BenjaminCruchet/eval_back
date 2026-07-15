const accountRepository = require("../Repository/user.repository");
const bcrypt = require("bcrypt");


async function getAccount(userId){

    const user = await accountRepository.getUserAccount(userId);

    if(!user){
        throw new Error(
            "Utilisateur introuvable"
        );
    }

    return user;
}

async function updateAccount(userId, data) {

    const { nom, prenom, email } = data;

    if(!email){
        throw new Error("L'adresse mail est obligatoire");
    }

    const user = await accountRepository.updateUser(
        userId,
        {
            nom,
            prenom,
            email
        }
    );

    return user;
}

async function updatePassword(userId, data){

    const {oldPassword, newPassword, confirmPassword} = data;

    if(!oldPassword || !newPassword || !confirmPassword){
        throw new Error("Tous les champs sont obligatoires");
    }

    if(newPassword !== confirmPassword){
        throw new Error("Les mots de passe ne correspondent pas");
    }

    const user = await accountRepository.getUserById(userId);
    const passwordValid = await bcrypt.compare(oldPassword, user.password);

    if(!passwordValid){
        throw new Error("Ancien mot de passe incorrect");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    return accountRepository.updatePassword(userId, hashedPassword);
}

module.exports = {
    getAccount,
    updateAccount,
    updatePassword
};