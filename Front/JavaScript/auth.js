document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    const message = document.getElementById("message");
    message.innerText = data.message;

    if (res.ok) {
        setTimeout(() => {
            window.location.href = "/";
        }, 2000);
    }
});