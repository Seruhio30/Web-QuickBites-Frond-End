
export function inicializarBotonesOrdenar() {
  const botones = document.querySelectorAll('.ordenar');

  botones.forEach(button => {
    button.addEventListener('click', () => {
      const producto = {
        nombre: button.dataset.producto,
        precio: button.dataset.precio,
        imagen: button.dataset.imagen
      };

      const productos = JSON.parse(localStorage.getItem('productos')) || [];
      productos.push(producto);
      localStorage.setItem('productos', JSON.stringify(productos));

      window.location.href = 'ordenar.html';
    });
  });
}