import { navigation } from "./navigation.js";
import { mostrarProductos, initFiltros } from "./productos.js";
import { initBanner } from "./banner.js";
import { ordenarProducto } from "./ordenar.js";
window.ordenarProducto = ordenarProducto; 

/****************************************************************************** */
navigation();

/*******************test**************************/

document.addEventListener("DOMContentLoaded", async () => {
  await mostrarProductos();  // Muestra todos los productos
  initFiltros();             // Activa los botones de filtro
  initBanner();              // Inicia el banner con los featured
});
