document.addEventListener("DOMContentLoaded", () => {


    updateGlobalTotal();

    document.querySelectorAll(".qty").forEach(input => {

        input.addEventListener("change", async (e) => {

            const row = e.target.closest(".panier-item");
            const cartId = row.dataset.cartId;
            const quantity = Number(e.target.value);
            const price = Number(row.querySelector(".price").dataset.price);
            const newTotal = price * quantity;

            row.querySelector(".line-total").textContent = newTotal + "€";

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


    const openButton = document.querySelector("#checkoutButton");
    const modalElement = document.getElementById("popUpValidationCommande");
    const paymentModal = new bootstrap.Modal(modalElement);

openButton.addEventListener("click", () => {

    paymentModal.show();

    setTimeout(() => {
        modalElement.querySelector("input").focus();
    }, 200);

});

    const paymentForm = document.querySelector("#paymentForm");

if(paymentForm){

    paymentForm.addEventListener("submit", async(e)=>{

        e.preventDefault();

        const formData = new FormData(paymentForm);

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



            const result = await response.json();

            if(!response.ok){

                alert(result.message);

                return;
            }

            alert("Commande validée !");

            paymentModal.hide();

            window.location.reload();

        } catch(error){

            console.error(error);

            alert(
                "Erreur lors de la validation"
            );

        }
    });

}

const clearCartButton = document.querySelector("#clearCart");

if(clearCartButton){

    clearCartButton.addEventListener("click", async()=>{

        if(!confirm("Voulez-vous vraiment vider votre panier ?")){

            return;
        }

        try{

            const response = await fetch("/cart",{
                method:"DELETE"
            });

            const result = await response.json();

            if(!response.ok){
                throw new Error(result.message);
            }

            alert(result.message);

            location.reload();

        }catch(err){

            alert(err.message);
        }

    });

}

});

function updateGlobalTotal(){

    let total = 0;

    document.querySelectorAll(".line-total").forEach(el=>{

            total += Number(el.textContent.replace("€",""));
        });

    const totalElement = document.getElementById("globalTotal");

    if(totalElement){
        totalElement.textContent = total + "€";
    }

}

