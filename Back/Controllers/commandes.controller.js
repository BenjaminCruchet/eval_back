const commandeService = require("../Services/commande.service");


async function validateCart(req,res){

    try{

        const userId = req.session.user.id;


        const commande =
            await commandeService.validateOrder(userId);


        res.json({

            success:true,
            commande

        });


    }catch(err){

        res.status(400).json({

            message:err.message

        });

    }

}


module.exports={
    validateCart
};