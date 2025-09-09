

document.addEventListener('DOMContentLoaded', () => {
    const agregarMasBtn = document.getElementById('agregar-mas');

    function handleAgregarMas() {
        const adicionales = document.querySelectorAll('.adicional-checkbox');
        const adicionalesSeleccionados = [];

        adicionales.forEach(adicional => {
            if (adicional.checked) {
                adicionalesSeleccionados.push({
                    text: adicional.parentElement.textContent.trim(),
                    price: parseInt(adicional.getAttribute('data-price'), 10) // Convertir a número
                });
                adicional.checked = false; // Desmarcar el checkbox después de seleccionarlo
            }
        });

        localStorage.setItem('adicionales', JSON.stringify(adicionalesSeleccionados));
        window.location.href = 'index.html#menu'; // Redirige a la sección del menú en index.html
    }

    agregarMasBtn.addEventListener('click', handleAgregarMas);
});
