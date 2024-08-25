document.addEventListener('DOMContentLoaded', function() {

    document.querySelectorAll('.ver-ingredientes').forEach(button => {
        button.addEventListener('click', function() {
            const itemContainer = this.closest('.item').querySelector('.item-container');
            itemContainer.classList.toggle('rotar');
        });
    });

    document.querySelectorAll('.ordenar').forEach(button => {
        button.addEventListener('click', function() {
            const producto = this.closest('.item').querySelector('.producto-nombre').textContent;
            const precio = parseFloat(this.closest('.item').querySelector('.producto-precio').dataset.price);
            const cantidad = this.closest('.item').querySelector('input[type="number"]') ? 
                             this.closest('.item').querySelector('input[type="number"]').value : 1;

            // Redirigir a la página de orden con producto, cantidad y precio en la URL
            window.location.href = `ordenar.html?producto=${encodeURIComponent(producto)}&precio=${precio}&cantidad=${cantidad}`;
        });
    });
});
