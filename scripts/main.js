import { navigation } from "./navigation.js";
import { mostrarProductos, initFiltros } from "./productos.js";
import { initBanner } from "./banner.js";
import { initCarrito, addProducto } from "./carrito.js";


// Hacemos disponible la función para los botones HTML
window.addProducto = addProducto;


/******************************************************************************/
navigation();


/******************************************************************************/
document.addEventListener("DOMContentLoaded", async () => {
  
  //Mostrar productos del JSON
  await mostrarProductos();

  //Activar filtros de categorías
  initFiltros();

  //Iniciar banner dinámico
  initBanner();

  //Inicializar Carrito (contador, render, eventos)
  initCarrito();
});
