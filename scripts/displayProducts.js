// renderProductos.js

/**
 * Renderiza los productos en el contenedor #product-menu
 * usando datos obtenidos desde la API.
 */
export async function cargarYRenderizarProductos() {
  const productMenu = document.getElementById("product-menu");

  // URL de la API donde se obtendrán los productos (ajusta según tu configuración)
  const apiUrl = "http://localhost:8080/api/products";

  try {
    // Obtener productos desde el backend
    const response = await fetch(apiUrl);
    const products = await response.json();

    // Limpiar el contenedor de productos antes de insertar nuevos
    productMenu.innerHTML = "";

    products.forEach(product => {
      const item = document.createElement("div");
      item.className = "item";

      // Estructura del producto en HTML
      item.innerHTML = `
        <div class="producto-nombre">${product.name}</div>
        <div class="item-container">
          <div class="producto-imagen-container">
            <img class="producto-imagen" src="${product.image}" alt="${product.name}">
            <div class="ingredientes">
              <ul>
                ${product.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>
        <div class="producto-precio">Precio: ¢${product.price}</div>
        <div class="item-actions">
          <button class="ver-ingredientes">Ver Ingredientes</button>
          <button class="ordenar" data-producto="${product.name}" data-precio="${product.price}" data-imagen="${product.image}">Ordenar</button>
        </div>
      `;

      productMenu.appendChild(item);
    });
  } catch (error) {
    console.error("Error al cargar productos:", error);
  }
}