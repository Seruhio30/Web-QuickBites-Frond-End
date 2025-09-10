

export function mostrarUltimoProducto() {
// Recupera el array de productos desde localStorage
  const productos = JSON.parse(localStorage.getItem('productos')) || [];
  // Verifica si hay productos almacenados
  if (productos.length > 0) {
    const ultimoProducto = productos[productos.length - 1];
      // Selecciona los elementos de la página donde mostrar los detalles del producto
    const productoImagen = document.getElementById('producto-imagen');
    const productoNombre = document.getElementById('producto-nombre');
    const productoPrecio = document.getElementById('producto-precio');
     // Muestra los detalles del último producto seleccionado
    productoImagen.src = ultimoProducto.imagen;
    productoNombre.textContent = ultimoProducto.nombre;
    productoPrecio.textContent = ultimoProducto.precio;
  } else {
    console.log("No hay productos almacenados en localStorage.");
  }
}

