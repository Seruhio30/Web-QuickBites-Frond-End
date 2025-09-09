document.addEventListener('DOMContentLoaded', function() {
    window.mostrarResumenPedido = function() {
        const productosSeleccionadosDiv = document.getElementById('productos-seleccionados');
        const totalPedidoDiv = document.getElementById('total-pedido');

        const productos = JSON.parse(localStorage.getItem('productos')) || [];
        const adicionales = JSON.parse(localStorage.getItem('adicionales')) || [];
        const envio = JSON.parse(localStorage.getItem('envio')) || null;

        let total = 0;

        productosSeleccionadosDiv.innerHTML = '';

        // Mostrar productos
        productos.forEach(producto => {
            const productoElement = document.createElement('div');
            productoElement.classList.add('producto-item');
            productoElement.innerHTML = `
                <div class="producto-detalle">
                    <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-img">
                    <span class="producto-nombre">${producto.nombre}</span>
                    <span class="producto-precio">¢${producto.precio}</span>
                </div>
            `;
            productosSeleccionadosDiv.appendChild(productoElement);
            total += parseFloat(producto.precio);
        });

        // Mostrar adicionales combinados
        adicionales.forEach(adicional => {
            const adicionalElement = document.createElement('div');
            adicionalElement.classList.add('adicional-item');
            adicionalElement.innerHTML = `
                <span class="adicional-texto">${adicional.text}</span>
                <span class="adicional-precio">¢${adicional.price}</span>
            `;
            productosSeleccionadosDiv.appendChild(adicionalElement);
            total += parseFloat(adicional.price);
        });

        // Mostrar costo de envío si aplica
        if (envio && envio.tipo === 'enviar') {
            const envioElement = document.createElement('div');
            envioElement.classList.add('envio-item');
            envioElement.innerHTML = `Envío a domicilio - ¢${envio.costo}`;
            productosSeleccionadosDiv.appendChild(envioElement);
            total += parseFloat(envio.costo);
        }

        // Mostrar total
        totalPedidoDiv.textContent = `Total: ¢${total.toFixed(2)}`;
    };

    // Inicializar el resumen al cargar la página
    mostrarResumenPedido();
});
