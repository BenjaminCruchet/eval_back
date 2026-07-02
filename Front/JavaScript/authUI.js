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
            <p>Connecté : ${data.user.email}</p>
            <a href="/admin"> PageAdmin </button>
            <form action="/api/auth/logout" method="POST">
            <button> Déconnexion</button>
            </form>
        `

    }else {

        form.style.display = "none";

        loginBox.innerHTML = `
            <p>Connecté : ${data.user.email}</p>
            <form action="/api/auth/logout" method="POST">
            <button> Déconnexion</button>
            </form>
        `;
    }
}

renderAuthUI();
