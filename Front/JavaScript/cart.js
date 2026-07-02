const quantity = document.querySelectorAll(".qty");

document.addEventListener("DOMContentLoaded", updateGlobalTotal);

/* Fonctions */
function updateGlobalTotal() {
    let total = 0;

    document.querySelectorAll(".line-total").forEach(el => {
        total += Number(el.textContent.replace("€", ""));
    });

    document.getElementById("globalTotal").textContent = total + "€";
};


/* Évènements */
    /* modif in cart */
    quantity.forEach(input => {
        input.addEventListener("change", async (e) => {

            const row = e.target.closest(".panier-item");
            const cartId = row.dataset.cartId;
            const quantity = Number(e.target.value);

            const Price = Number(
                row.querySelector(".price").dataset.price
            );

            const newTotal = Price * quantity;

            row.querySelector(".line-total").textContent = newTotal + "€";

            await fetch(`/cart/${cartId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ quantity })
            });

            updateGlobalTotal();
        });
    });

    /* suppress in cart */
    document.querySelectorAll(".remove-item").forEach(btn => {
        btn.addEventListener("click", async (e) => {

            const row = e.target.closest(".panier-item");
            const cartId = row.dataset.cartId;

            console.log("DELETE ID :", cartId);
            console.log(row.dataset);

            await fetch(`/cart/${cartId}`, {
                method: "DELETE"
            });

            row.remove();

            updateGlobalTotal();
        });
    });