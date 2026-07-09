const accountService =
    require("../Services/account.service");



async function getAccount(req,res){


    try{


        const userId =
            req.session.user.id;



        const user =
            await accountService.getAccount(userId);



        res.render(
            "account",
            {
                user,
                titre : "Mon compte"
            }
        );



    }catch(err){


        res.status(500).send(
            err.message
        );


    }

}


module.exports = {
    getAccount
};