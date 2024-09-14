// document.addEventListener("DOMContentLoaded", function() {
//     // Obtén los datos del producto desde localStorage
//     var productoNombre = localStorage.getItem('productoNombre');
//     var productoPrecio = localStorage.getItem('productoPrecio');
//     var productoImagen = localStorage.getItem('productoImagen');

//     // Selecciona los elementos del DOM donde se mostrarán los datos
//     var nombreElemento = document.getElementById('producto-nombre');
//     var precioElemento = document.getElementById('producto-precio');
//     var imagenElemento = document.getElementById('producto-imagen');

//     // Asigna los datos a los elementos del DOM
//     if (nombreElemento) nombreElemento.textContent = productoNombre || 'Producto';
//     if (precioElemento) precioElemento.textContent = productoPrecio || '0';
//     if (imagenElemento) imagenElemento.src = productoImagen || '';

//     // Limpia los datos del localStorage después de cargarlos
//     localStorage.removeItem('productoNombre');
//     localStorage.removeItem('productoPrecio');
//     localStorage.removeItem('productoImagen');
// });



// document.addEventListener("DOMContentLoaded", function() {
//     // Recupera el array de productos desde localStorage
//     var productos = JSON.parse(localStorage.getItem('productos')) || [];

//     // Verifica si hay productos almacenados
//     if (productos.length > 0) {
//         var productosSeleccionadosDiv = document.getElementById('productos-seleccionados');

//         // Limpia el contenedor antes de agregar los productos
//         productosSeleccionadosDiv.innerHTML = "";

//         // Recorre cada producto y lo muestra en la página
//         productos.forEach(function(producto) {
//             var productoDetalle = document.createElement('div');
//             productoDetalle.innerHTML = `
//                 <div class="img-container">
//                     <img class="imagen-producto" src="${producto.imagen}" alt="${producto.nombre}">
//                 </div>
//                 <h2>${producto.nombre}</h2>
//                 <p>Precio: ¢${producto.precio}</p>
//             `;
//             productosSeleccionadosDiv.appendChild(productoDetalle);
//         });
//     } else {
//         console.log("No hay productos en el localStorage");
//     }
// });

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

