document.addEventListener("DOMContentLoaded", () => {


    updateGlobalTotal();



    /* Modification quantité */

    document.querySelectorAll(".qty").forEach(input => {

        input.addEventListener("change", async (e) => {


            const row = e.target.closest(".panier-item");

            const cartId = row.dataset.cartId;

            const quantity = Number(e.target.value);


            const price = Number(
                row.querySelector(".price").dataset.price
            );


            const newTotal = price * quantity;


            row.querySelector(".line-total").textContent =
                newTotal + "€";



            await fetch(`/cart/${cartId}`, {

                method:"PATCH",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({
                    quantity
                })

            });


            updateGlobalTotal();


        });

    });




    /* Suppression */

    document.querySelectorAll(".remove-item").forEach(btn => {


        btn.addEventListener("click", async(e)=>{


            const row = e.target.closest(".panier-item");

            const cartId = row.dataset.cartId;



            await fetch(`/cart/${cartId}`, {

                method:"DELETE"

            });



            row.remove();


            updateGlobalTotal();


        });


    });





    /* Modal paiement */

    const openButton =
        document.querySelector("#checkoutButton");


    const validationCommandeModal =
        document.querySelector("#popUpValidationCommande");


    const closeButton =
        document.querySelector("#closePopUpValidationCommande");



    openButton.addEventListener("click",()=>{
        validationCommandeModal.showModal();
        validationCommandeModal.querySelector("input, select, textarea, button").focus();
    });

    closeButton.addEventListener("click",()=>{

        validationCommandeModal.close();

    });

    const paymentForm =
    document.querySelector("#paymentForm");


if(paymentForm){


    paymentForm.addEventListener("submit", async(e)=>{


        e.preventDefault();



        const formData =
            new FormData(paymentForm);



        const data = {

            nom: formData.get("nom"),

            prenom: formData.get("prenom"),

            cardNumber: formData.get("cardNumber")

        };



        try {


            const response = await fetch(
                "/cart/validate",
                {

                    method:"POST",

                    headers:{
                        "Content-Type":"application/json"
                    },

                    body:JSON.stringify(data)

                }
            );



            const result =
                await response.json();



            if(!response.ok){

                alert(result.message);

                return;

            }



            alert("Commande validée !");



            validationCommandeModal.close();



            // temporaire
            window.location.reload();



        } catch(error){


            console.error(error);

            alert(
                "Erreur lors de la validation"
            );

        }


    });

}

});

function updateGlobalTotal(){


    let total = 0;


    document.querySelectorAll(".line-total")
        .forEach(el=>{


            total += Number(
                el.textContent.replace("€","")
            );


        });


    const totalElement =
        document.getElementById("globalTotal");


    if(totalElement){

        totalElement.textContent =
            total + "€";

    }

}