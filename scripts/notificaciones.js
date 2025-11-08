export function mostrarNotificacion(mensaje) {
  const aviso = document.createElement("div");
  aviso.className = "alerta-carrito";
  aviso.textContent = mensaje;

  document.body.appendChild(aviso);

  // Ocultar luego de 1.8s
  setTimeout(() => {
    aviso.classList.add("hide");   // activa animación
    setTimeout(() => aviso.remove(), 500); // lo elimina
  }, 1800);
}
