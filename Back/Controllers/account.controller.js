const accountService =
    require("../Services/account.service");

async function getAccount(req,res){

    try{

        const userId = req.session.user.id;
        const user = await accountService.getAccount(userId);

        res.render("account",{
                user,
                titre : "Mon compte"
            });

    }catch(err){

        res.status(500).send(
            err.message
        );
    }
}

async function updateAccount(req,res){

    try{

        const userId = req.session.user.id;
        const user = await accountService.updateAccount(userId,req.body);

        req.session.user.email = user.email;

        res.json({
            success:true,
            user
        });

    }catch(err){

        res.status(400).json({
            message:err.message
        });
    }
}

async function updatePassword(req,res){

    try{

        const userId = req.session.user.id;

        await accountService.updatePassword(userId,req.body);

        return res.json({
            success:true,
            message:"Mot de passe modifié"
        });


    }catch(err){

        return res.status(400).json({
            message:err.message
        });
    }
}

module.exports = {
    getAccount,
    updateAccount,
    updatePassword
};