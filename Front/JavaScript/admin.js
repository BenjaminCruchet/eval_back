async function deleteConcert(id) {

    if (!confirm("Supprimer ce concert ?")) {
        return;
    }

    const res = await fetch(`/admin/concerts/${id}`, {
        method: "DELETE"
    });

    if (res.ok) {
        location.reload();
    } else {
        alert("Erreur lors de la suppression");
    }
}


document.querySelectorAll(".edit-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        enableEdit(id);
    });
});

function enableEdit(id) {

    document.querySelectorAll(`#row-${id} .view`)
        .forEach(el => el.classList.add("d-none"));

    document.querySelectorAll(`#row-${id} .edit`)
        .forEach(el => el.classList.remove("d-none"));
}


document.querySelectorAll(".cancel-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        cancelEdit(id);
    });
});

function cancelEdit(id) {

    document.querySelectorAll(`#row-${id} .edit`)
        .forEach(el => el.classList.add("d-none"));

    document.querySelectorAll(`#row-${id} .view`)
        .forEach(el => el.classList.remove("d-none"));
}


document.querySelectorAll(".save-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
        const id = btn.dataset.id;
        await updateConcert(id);
    });
});

async function updateConcert(id) {

    const data = {
        ville: document.querySelector(`#ville-${id}`).value,
        lieu: document.querySelector(`#lieu-${id}`).value,
        date: document.querySelector(`#date-${id}`).value,
        stock: document.querySelector(`#stock-${id}`).value,
        prix: document.querySelector(`#prix-${id}`).value
    };

    const res = await fetch(`/admin/concerts/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (res.ok) {
        location.reload();
    } else {
        alert("Erreur lors de la modification");
    }
}


document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
         await deleteConcert(btn.dataset.id);
    });
});