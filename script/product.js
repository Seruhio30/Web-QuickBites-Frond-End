

document.addEventListener("DOMContentLoaded", function() {
    // Recupera el array de productos desde localStorage
    var productos = JSON.parse(localStorage.getItem('productos')) || [];

    // Verifica si hay productos almacenados
    if (productos.length > 0) {
        // Obtén el último producto del array
        var ultimoProducto = productos[productos.length - 1];

        // Selecciona los elementos de la página donde mostrar los detalles del producto
        var productoImagen = document.getElementById('producto-imagen');
        var productoNombre = document.getElementById('producto-nombre');
        var productoPrecio = document.getElementById('producto-precio');

        // Muestra los detalles del último producto seleccionado
        productoImagen.src = ultimoProducto.imagen;
        productoNombre.textContent = ultimoProducto.nombre;
        productoPrecio.textContent = ultimoProducto.precio;

    } else {
        console.log("No hay productos almacenados en localStorage.");
    }
});

