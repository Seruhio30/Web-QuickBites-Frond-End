import { navigation } from "./navigation.js";
import { mostrarUltimoProducto } from "./product.js";
import { inicializarBotonesOrdenar } from "./ordenar.js";
import { cargarYRenderizarProductos } from "./displayProducts.js";

/****************************************************************************** */
navigation();
document.addEventListener("DOMContentLoaded", mostrarUltimoProducto);
document.addEventListener('DOMContentLoaded', inicializarBotonesOrdenar);
document.addEventListener("DOMContentLoaded", cargarYRenderizarProductos);


