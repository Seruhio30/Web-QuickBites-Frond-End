

export let productos = []; // Se guarda una vez para no recargar cada vez

// Cargar productos del JSON
async function cargarProductos() {
  if (productos.length === 0) {
    const response = await fetch("data/productos.json");
    productos = await response.json();
  }
  return productos;
}

// Mostrar productos (con filtro opcional)
export async function mostrarProductos(categoria = "todos") {
  const contenedor = document.getElementById("product-menu");
  contenedor.innerHTML = "";

  const data = await cargarProductos();

  const lista = categoria === "todos"
    ? data
    : data.filter(p => p.categoria === categoria);

  lista.forEach(producto => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("producto");

    tarjeta.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>${producto.descripcion}</p>
      <span>₡${producto.precio}</span> <br>
      <button class="btn" onclick="ordenarProducto(${producto.id})">Ordenar</button>
    `;

    contenedor.appendChild(tarjeta);
  });
}

// Inicializar los botones de filtro
export async function initFiltros() {
  const botones = document.querySelectorAll("#filtros button");

  botones.forEach(boton => {
    boton.addEventListener("click", async () => {
      // Quitar el estilo activo a todos
      botones.forEach(b => b.classList.remove("activo"));
      // Marcar el botón actual
      boton.classList.add("activo");

      const categoria = boton.dataset.categoria;
      await mostrarProductos(categoria);
    });
  });
}
