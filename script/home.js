// Seleccionamos todos los botones "ver-ingredientes"
const botonesVerIngredientes = document.querySelectorAll('.ver-ingredientes');

botonesVerIngredientes.forEach(boton => {
  boton.addEventListener('click', function() {
    // Seleccionamos el contenedor de la imagen que está más cerca del botón clicado
    const itemContainer = boton.closest('.item').querySelector('.producto-imagen-container');
    
    // Alternamos la clase "rotated" para activar/desactivar la rotación y la visibilidad
    itemContainer.classList.toggle('rotated');
  });
});
