// auth-check.js
document.addEventListener("DOMContentLoaded", function() {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Por favor, inicia sesión primero.");
        window.location.href = "login.html"; // Redirige a la página de inicio de sesión
    }
});
