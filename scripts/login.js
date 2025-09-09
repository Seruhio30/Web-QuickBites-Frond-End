document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que el formulario se envíe

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error de autenticación");
        }
        return response.json();
    })
    .then(data => {
        // Almacena el token y redirige al panel de administración
        localStorage.setItem("token", data.token);
        window.location.href = "/admin-dashboard.html";
    })
    .catch(error => {
        document.getElementById("error-message").textContent = "Usuario o contraseña incorrectos.";
        console.error("Error:", error);
    });
});
