document.addEventListener("DOMContentLoaded", function() {
    var ordenarButtons = document.querySelectorAll(".ordenar");

    ordenarButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var producto = {
                nombre: button.getAttribute('data-producto'),
                precio: button.getAttribute('data-precio'),
                imagen: button.getAttribute('data-imagen')
            };

            var productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];
            productosGuardados.push(producto);
            localStorage.setItem('productos', JSON.stringify(productosGuardados));

            window.location.href = 'ordenar.html';
        });
    });
});
