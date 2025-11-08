// carrito.js
import { cargarProductos } from "./productos.js";
import { mostrarNotificacion } from "./notificaciones.js";

// ====== Estado / Storage ======
export function getCarrito() {
  return JSON.parse(localStorage.getItem("carrito")) || [];
}
function saveCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// ====== Mutaciones ======
export async function addProducto(id) {
  const lista = await cargarProductos();
  const producto = lista.find(p => p.id === id);
  if (!producto) return;

  if ((producto.extras && producto.extras.length) || (producto.removibles && producto.removibles.length)) {
    abrirModalExtras(producto);
  } else {
    agregarDirecto(producto); //sin extras
  }
}

function agregarDirecto(producto) {
  const carrito = getCarrito();
  const existente = carrito.find(p => p.id === producto.id);

  if (existente) {
    existente.cantidad = (existente.cantidad || 1) + 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }
  saveCarrito(carrito);
  renderCarrito();
  mostrarNotificacion("Producto añadido al carrito ✅");
}

function guardarConExtras(producto, seleccion) {
  const carrito = getCarrito();

  // Nota: al llevar extras, tratamos cada "configuración" como línea independiente
  carrito.push({
    ...producto,
    extrasSeleccionados: seleccion.extras || [],
    removidos: seleccion.removidos || [],
    cantidad: 1
  });

  saveCarrito(carrito);
  cerrarModal();
  mostrarNotificacion("Producto añadido al carrito ✅");
  renderCarrito();
}

// ====== Modal Extras ======
function abrirModalExtras(producto) {
  const modal = document.getElementById("extrasModal");
  const title = document.getElementById("modal-title");
  const container = document.getElementById("extras-container");
  if (!modal || !title || !container) {
    // Si estás en carrito.html (sin modal), agrega directo
    agregarDirecto(producto);
    return;
  }

  // Guardamos el producto activo para confirmación
  window.productoActual = producto;

  title.textContent = producto.nombre;
  container.innerHTML = "";

  if (producto.extras && producto.extras.length) {
    container.innerHTML += `<h4>Extras</h4>`;
    producto.extras.forEach(x => {
      container.innerHTML += `
        <label style="display:block;margin:.25rem 0;">
          <input type="checkbox" data-extra="${x.nombre}" data-precio="${x.precio}">
          ${x.nombre} (+₡${x.precio})
        </label>`;
    });
  }

  if (producto.removibles && producto.removibles.length) {
    container.innerHTML += `<h4>Quitar</h4>`;
    producto.removibles.forEach(x => {
      container.innerHTML += `
        <label style="display:block;margin:.25rem 0;">
          <input type="checkbox" data-remove="${x}">
          Sin ${x}
        </label>`;
    });
  }

  modal.classList.remove("hidden");
}

function cerrarModal() {
  const modal = document.getElementById("extrasModal");
  if (modal) modal.classList.add("hidden");
}


// Listener del botón confirmar extras (solo si existe en esta página)
const btnConfirm = document.getElementById("confirm-extras");
if (btnConfirm) {
  btnConfirm.addEventListener("click", () => {
    const modal = document.getElementById("extrasModal");
    if (!modal) return;

    const extras = [...modal.querySelectorAll("[data-extra]:checked")].map(x => ({
      nombre: x.dataset.extra,
      precio: Number(x.dataset.precio)
    }));

    const removidos = [...modal.querySelectorAll("[data-remove]:checked")].map(x => x.dataset.remove);

    guardarConExtras(window.productoActual, { extras, removidos });
  });
}

const btnClose = document.getElementById("close-modal");
if (btnClose) {
  btnClose.addEventListener("click", cerrarModal);
}

// ====== Mutaciones auxiliares ======
export function removeProducto(index) {
  const carrito = getCarrito();
  carrito.splice(index, 1);
  saveCarrito(carrito);
  renderCarrito();
}

// ====== Render ======
export function renderCarrito() {
  const carrito = getCarrito();
  const cartCount = document.getElementById("cartCount");
  const contenedor = document.querySelector(".cart-items");

  //BOTÓN FLOTANTE
  const floatingBtn = document.getElementById("floating-cart-btn");
  const floatCount = document.getElementById("float-count");

  if (floatingBtn) {
    if (carrito.length > 0) {
      floatingBtn.classList.remove("hidden");
      if (floatCount) floatCount.textContent = carrito.length;
    } else {
      floatingBtn.classList.add("hidden");
    }
  }

  // contador
  if (cartCount) cartCount.textContent = carrito.length;

  // Si no hay contenedor (por ejemplo, en index sin la sección), termina
  if (!contenedor) return;

  // Carrito vacío
  if (carrito.length === 0) {
    contenedor.innerHTML = `<p class="carrito-vacio">Tu carrito está vacío</p>`;
    calcularTotal();
    return;
  }

  contenedor.innerHTML = "";

  carrito.forEach((p, index) => {
    const item = document.createElement("div");
    item.classList.add("cart-item");

    // Subtotal de línea = (precio base + extras) * cantidad
    const extrasTotal = p.extrasSeleccionados?.reduce((s, e) => s + e.precio, 0) || 0;
    const subtotal = (p.precio + extrasTotal) * p.cantidad;

    item.innerHTML = `
      <div class="cart-line">
        <img src="${p.imagen}" class="cart-img" alt="${p.nombre}"/>

        <div class="cart-info">
          <p class="cart-name">${p.nombre}</p>

          ${p.extrasSeleccionados && p.extrasSeleccionados.length ? `
            <small class="cart-extras">Extras: ${p.extrasSeleccionados.map(e => e.nombre).join(", ")}</small>
          ` : ""}

          ${p.removidos && p.removidos.length ? `
            <small class="cart-removidos">Sin: ${p.removidos.join(", ")}</small>
          ` : ""}

          <div class="qty-controls">
            <button class="qty-minus" data-index="${index}">−</button>
            <span class="qty">${p.cantidad}</span>
            <button class="qty-plus" data-index="${index}">+</button>
          </div>
        </div>

        <p class="cart-subtotal">₡${subtotal}</p>

        <button class="btn btn-remove" data-index="${index}">✕</button>
      </div>
    `;

    contenedor.appendChild(item);
  });

  calcularTotal();
}

// ====== Total ======
export function calcularTotal() {
  const carrito = getCarrito();
  const selectEntrega = document.getElementById("tipo-entrega");
  if (!selectEntrega) return;

  const tipoEntrega = selectEntrega.value;
  const costoEnvio = tipoEntrega === "envio" ? 1000 : 0;

  const subtotal = carrito.reduce((acc, p) => {
    const extrasTotal = p.extrasSeleccionados?.reduce((s, e) => s + e.precio, 0) || 0;
    return acc + (p.precio + extrasTotal) * p.cantidad;
  }, 0);

  const total = subtotal + costoEnvio;

  const costoEnvioEl = document.getElementById("costo-envio");
  const totalPedidoEl = document.getElementById("total-pedido");

  if (costoEnvioEl) costoEnvioEl.textContent = `Costo de envío: ₡${costoEnvio}`;
  if (totalPedidoEl) totalPedidoEl.textContent = `Total: ₡${total}`;
}

// ====== Inicialización ======
export function initCarrito() {
  renderCarrito();

  const selectEntrega = document.getElementById("tipo-entrega");
  if (selectEntrega) {
    selectEntrega.addEventListener("change", calcularTotal);
  }

  // Delegación de eventos (sumar/restar/eliminar)
  document.addEventListener("click", (e) => {
    // ➖ Restar
    if (e.target.matches(".qty-minus")) {
      const carrito = getCarrito();
      const index = Number(e.target.dataset.index);
      carrito[index].cantidad--;
      if (carrito[index].cantidad <= 0) carrito.splice(index, 1);
      saveCarrito(carrito);
      renderCarrito();
    }

    // ➕ Sumar
    if (e.target.matches(".qty-plus")) {
      const carrito = getCarrito();
      const index = Number(e.target.dataset.index);
      carrito[index].cantidad++;
      saveCarrito(carrito);
      renderCarrito();
    }

    // ❌ Eliminar
    if (e.target.matches(".btn.btn-remove")) {
      const index = Number(e.target.getAttribute("data-index"));
      removeProducto(index);
    }
  });

  const floatingBtn = document.getElementById("floating-cart-btn");
  if (floatingBtn) {
    floatingBtn.addEventListener("click", () => {
      window.location.href = "carrito.html";
    });
  }

  const btnConfirmar = document.getElementById("btnConfirmarPedido");
  if (btnConfirmar) {
    btnConfirmar.addEventListener("click", enviarPedidoWhatsApp);
  }


}

//formulario de envio whatsapp
//Armado mensaje & envío por WhatsApp
function enviarPedidoWhatsApp() {
  const carrito = getCarrito();
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  const nombre = document.getElementById("nombreCliente").value.trim();
  const direccion = document.getElementById("direccionCliente").value.trim();
  const metodoPago = document.getElementById("metodoPago").value;
  const notas = document.getElementById("notasCliente").value.trim();
  const tipoEntrega = document.getElementById("tipo-entrega").value;

  // Validaciones mínimas
  if (!nombre) {
    alert("Por favor ingresa tu nombre.");
    return;
  }

  if (tipoEntrega === "envio" && !direccion) {
    alert("Por favor ingresa la dirección.");
    return;
  }

  //Construir resumen de productos
  let mensaje = `Nuevo pedido Quick Bites 🧡\n\n`;
  mensaje += `👤 Cliente: ${nombre}\n`;
  mensaje += `📍 Entrega: ${tipoEntrega === "envio" ? "Envío" : "Retiro"}\n`;

  if (tipoEntrega === "envio") {
    mensaje += `📦 Dirección: ${direccion}\n`;
  }

  mensaje += `💳 Pago: ${metodoPago.toUpperCase()}\n\n`;
  mensaje += `🛒 Pedido:\n`;

  let subtotal = 0;
 carrito.forEach(p => {

  const extrasTotal = p.extrasSeleccionados?.reduce((s, e) => s + e.precio, 0) || 0;
  const precioFinal = (p.precio + extrasTotal) * p.cantidad;
  subtotal += precioFinal;

  mensaje += `• ${p.cantidad}× ${p.nombre} — ₡${precioFinal}\n`;

  // ✅ Mostrar extras
  if (p.extrasSeleccionados?.length) {
    mensaje += `   ➕ Extras:\n`;
    p.extrasSeleccionados.forEach(e => {
      mensaje += `      - ${e.nombre} (+₡${e.precio})\n`;
    });
  }

  // ✅ Mostrar ingredientes removidos
  if (p.removidos?.length) {
    mensaje += `   ➖ Sin:\n`;
    p.removidos.forEach(r => {
      mensaje += `      - ${r}\n`;
    });
  }

  mensaje += "\n";
});


  const costoEnvio = tipoEntrega === "envio" ? 1000 : 0;
  const total = subtotal + costoEnvio;

  mensaje += `\n📦 Envío: ₡${costoEnvio}`;
  mensaje += `\nTOTAL: ₡${total}\n`;

  if (notas) {
    mensaje += `\n📌 Notas: ${notas}\n`;
  }

  //Enviar a WhatsApp
  const numero = "50687733663";   // <<<<<<<< CAMBIAR POR TU NÚM REAL
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

  window.open(url, "_blank");
}

