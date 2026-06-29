document.getElementById("addToCartBtn").addEventListener("click", async () => {

    const popUpReservation = document.getElementById("popUpReservation");

    const concertId = popUpReservation.dataset.concertId;
    const quantity = document.getElementById("nbPlace").value;

    const response = await fetch("/cart/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            concertId,
            quantity
        })
    });

    const data = await response.json();

    if (!response.ok) {
        alert(data.message || "Erreur");
        return;
    }

    alert("Ajouté au panier !");
});