document.addEventListener('DOMContentLoaded', function() {
    // Verifica que los elementos existen en el DOM
    const productoNombreElement = document.getElementById('producto-nombre');
    const productoPrecioElement = document.getElementById('producto-precio');
    const cantidadElement = document.getElementById('cantidad');

    if (!productoNombreElement) {
        console.error("El elemento con ID 'producto-nombre' no existe en el DOM.");
    } else {
        console.log("El elemento 'producto-nombre' fue encontrado correctamente.");
    }

    if (!productoPrecioElement) {
        console.error("El elemento con ID 'producto-precio' no existe en el DOM.");
    } else {
        console.log("El elemento 'producto-precio' fue encontrado correctamente.");
    }

    if (!cantidadElement) {
        console.error("El elemento con ID 'cantidad' no existe en el DOM.");
    } else {
        console.log("El elemento 'cantidad' fue encontrado correctamente.");
    }

    // Detener la ejecución si alguno de los elementos no existe
    if (!productoNombreElement || !productoPrecioElement || !cantidadElement) {
        return; // Detener la ejecución del script si no encuentra los elementos
    }

    // Obtiene los parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const producto = urlParams.get('producto');
    const precio = urlParams.get('precio');
    const cantidad = urlParams.get('cantidad') || 1;

    // Establece los valores iniciales en los elementos
    productoNombreElement.textContent = producto;
    productoPrecioElement.textContent = precio;
    cantidadElement.value = cantidad;

    // Función para calcular el total incluyendo adicionales
    function calcularTotal() {
        let total = parseFloat(precio) * parseInt(cantidadElement.value);
        document.querySelectorAll('.adicional-item input[type="number"]').forEach(input => {
            const adicionalCantidad = parseInt(input.value);
            const adicionalPrecio = parseFloat(input.dataset.price);
            total += adicionalCantidad * adicionalPrecio;
        });
        document.getElementById('total-pedido').textContent = total.toFixed(2);
    }

    // Event listeners para actualizaciones en los adicionales y la cantidad
    document.querySelectorAll('.adicional-item input[type="number"]').forEach(input => {
        input.addEventListener('input', calcularTotal);
    });

    document.querySelectorAll('input[name="envio"]').forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'enviar') {
                document.getElementById('envio-detalle').style.display = 'block';
            } else {
                document.getElementById('envio-detalle').style.display = 'none';
            }
            calcularTotal();
        });
    });

    // Event listener para el botón de agregar más
    document.getElementById('agregar-mas').addEventListener('click', function() {
        window.location.href = 'index.html';  // Vuelve al menú principal
    });

    // Event listener para el botón de realizar pedido
    document.getElementById('realizar-pedido').addEventListener('click', function() {
        alert('Pedido confirmado. Total: $' + document.getElementById('total-pedido').textContent);
    });

    // Inicializa el total al cargar la página
    calcularTotal();
});
