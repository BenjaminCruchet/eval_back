async function processPayment(data){

    const {cardNumber} = data;


    if(!cardNumber){
        throw new Error("Informations de paiement manquantes");
    }


    // simulation

    return {
        success:true,
        transactionId:"TEST-" + Date.now()
    };

}


module.exports={
    processPayment
};