const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const response = await fetch(loginForm.action, {
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            email: loginForm.email.value,
            password: loginForm.password.value
        })
    });

    const data = await response.json();

    if (!response.ok) {
        alert(data.message);
        return;
    }

    window.location.reload();
});


async function renderAuthUI() {

    const res = await fetch("/api/auth/me", {
        credentials: "include"
    });

    const data = await res.json();

    const loginBox = document.querySelector(".login-box");
    const form = document.getElementById("loginForm");

    if (!data.authenticated) {

        form.style.display = "block";

        if (!document.getElementById("registerLink")) {
            const p = document.createElement("p");
            p.className = "register-text";
            p.innerHTML = `Pas encore inscrit ? <a href="/register" id="registerLink">Inscription</a>`;
            loginBox.appendChild(p);
        }

    } else if (data.user.role === "admin"){
        form.style.display = "none";
        loginBox.innerHTML = `
            <p style="color:white">Connecté : ${data.user.email}</p>
            <div class="d-flex flex-row gap-3">
            <a class="secondary-button" href="/admin"> PageAdmin </a>
            <form action="/api/auth/logout" method="POST">
            <button class="secondary-button"> Déconnexion</button>
            </form>
            </div>
        `

    }else {

        form.style.display = "none";

        loginBox.innerHTML = `
            <p style="color:white" >Connecté : ${data.user.email}</p>
            <form action="/api/auth/logout" method="POST">
            <button class="secondary-button"> Déconnexion</button>
            </form>
        `;
    }
}

renderAuthUI();
