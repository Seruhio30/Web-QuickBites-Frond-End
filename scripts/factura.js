document.addEventListener('DOMContentLoaded', function() {
    const realizarPedidoBtn = document.getElementById('realizar-pedido');

    realizarPedidoBtn.addEventListener('click', function() {
        // Redirige a la página de factura
        window.location.href = 'factura.html';
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const fechaElemento = document.getElementById('fecha');
    const horaElemento = document.getElementById('hora');
    const productosOrdenadosDiv = document.getElementById('productos-ordenados');
    const totalElemento = document.getElementById('total');
    const confirmarBtn = document.getElementById('confirmar-pedido');

    // Muestra la fecha y hora actuales
    const now = new Date();
    fechaElemento.textContent = now.toLocaleDateString();
    horaElemento.textContent = now.toLocaleTimeString();

    // Obtener productos y otros detalles del pedido desde el localStorage (puede ser adaptado al back-end)
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const adicionales = JSON.parse(localStorage.getItem('adicionales')) || [];
    const envio = JSON.parse(localStorage.getItem('envio')) || null;

    let total = 0;

    // Mostrar los productos
    productos.forEach(producto => {
        const productoElement = document.createElement('div');
        productoElement.classList.add('producto-item');
        productoElement.innerHTML = `
            <span>${producto.nombre}</span>
            <span>¢${producto.precio}</span>
        `;
        productosOrdenadosDiv.appendChild(productoElement);
        total += parseFloat(producto.precio);
    });

    // Mostrar los adicionales
    adicionales.forEach(adicional => {
        const adicionalElement = document.createElement('div');
        adicionalElement.classList.add('adicional-item');
        adicionalElement.innerHTML = `
            <span>${adicional.text}</span>
            <span>¢${adicional.price}</span>
        `;
        productosOrdenadosDiv.appendChild(adicionalElement);
        total += parseFloat(adicional.price);
    });

    // Mostrar el envío si aplica
    if (envio && envio.tipo === 'enviar') {
        const envioElement = document.createElement('div');
        envioElement.classList.add('envio-item');
        envioElement.innerHTML = `
            <span>Envío a domicilio</span>
            <span>¢${envio.costo}</span>
        `;
        productosOrdenadosDiv.appendChild(envioElement);
        total += parseFloat(envio.costo);
    }

    // Mostrar el total
    totalElemento.textContent = `¢${total.toFixed(2)}`;

    // Manejar la confirmación del pedido
    confirmarBtn.addEventListener('click', () => {
        // Aquí puedes enviar los datos al back-end usando fetch o cualquier otra herramienta
        const datosPedido = {
            productos,
            adicionales,
            envio,
            total,
            fecha: now.toLocaleDateString(),
            hora: now.toLocaleTimeString()
        };

        // Ejemplo de cómo enviar al back-end
        fetch('URL_DEL_BACKEND', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosPedido),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Pedido confirmado:', data);
            alert('Tu pedido ha sido confirmado.');
            // Aquí puedes redirigir a una página de confirmación o limpiar el carrito
        })
        .catch(error => {
            console.error('Error al confirmar el pedido:', error);
        });
    });
});
