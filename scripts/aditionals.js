document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar todos los checkboxes de adicionales
    var checkboxes = document.querySelectorAll('.adicional-checkbox');

    // Manejar el evento de cambio en los checkboxes
    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            // Recuperar los adicionales almacenados previamente en localStorage
            let adicionalesSeleccionados = JSON.parse(localStorage.getItem('adicionales')) || [];

            // Si el checkbox está marcado, agregar o combinar el adicional
            if (checkbox.checked) {
                const nuevoAdicional = {
                    text: checkbox.parentElement.textContent.trim(),
                    price: parseInt(checkbox.getAttribute('data-price'), 10)
                };

                // Verificar si el adicional ya existe
                const existente = adicionalesSeleccionados.find(a => a.text === nuevoAdicional.text);
                if (existente) {
                    // Si ya existe, sumar el precio
                    existente.price += nuevoAdicional.price;
                } else {
                    // Si no existe, agregarlo
                    adicionalesSeleccionados.push(nuevoAdicional);
                }
            } else {
                // Si el checkbox se desmarca, remover el adicional
                adicionalesSeleccionados = adicionalesSeleccionados.filter(a => a.text !== checkbox.parentElement.textContent.trim());
            }

            // Guardar los adicionales en localStorage
            localStorage.setItem('adicionales', JSON.stringify(adicionalesSeleccionados));

            // Llamar a la función para actualizar el resumen del pedido
            mostrarResumenPedido();
        });
    });
});
