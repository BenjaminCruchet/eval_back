const accountRepository =
    require("../Repository/account.repository");


async function getAccount(userId){

    const user =
        await accountRepository.getUserAccount(userId);


    if(!user){

        throw new Error(
            "Utilisateur introuvable"
        );

    }


    return user;

}


module.exports = {
    getAccount
};