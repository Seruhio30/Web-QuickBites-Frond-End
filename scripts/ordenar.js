// ordenar.js

import { productos } from "./productos.js";

let carrito = [];

export function ordenarProducto(id) {
  const producto = productos.find(p => p.id === id);
  if (producto) {
    carrito.push(producto);
    actualizarCarrito();
  } else {
    console.error("Producto no encontrado con id:", id);
  }
}

//trabajo pendiente en estafuncion, se debe hacer que aparesca la cantidad de un mismo producto pedido o bien que sea la cantidad total de productos pedidos en un icono de carrito
function actualizarCarrito() {
  const contenedor = document.querySelector(".cart-items");

  contenedor.innerHTML = "";

  carrito.forEach((producto, index) => {
    const item = document.createElement("div");
    item.classList.add("cart-item");

    item.innerHTML = `
      <p>${producto.nombre} - ₡${producto.precio}</p>
      <button class="btn" onclick="eliminarProducto(${index})">Eliminar</button>
    `;

    contenedor.appendChild(item);
  });

  calcularTotal();
}


function calcularTotal() {
  const tipoEntrega = document.getElementById("tipo-entrega").value;
  const costoEnvio = tipoEntrega === "envio" ? 1000 : 0;

  const subtotal = carrito.reduce((acc, prod) => acc + prod.precio, 0);
  const total = subtotal + costoEnvio;

  document.getElementById("costo-envio").textContent = `Costo de envío: ₡${costoEnvio}`;
  document.getElementById("total-pedido").textContent = `Total: ₡${total}`;
}


window.eliminarProducto = function(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
};
