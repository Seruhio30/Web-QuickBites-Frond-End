export async function initBanner() {
  try {
    const response = await fetch("data/productos.json");
    const productos = await response.json();

    // Filtramos solo los destacados
    const slides = productos.filter(p => p.featured);

    const banner = document.querySelector(".banner");
    const title = document.getElementById("hero-title");
    const subtitle = document.getElementById("hero-subtitle");

    let index = 0;
    banner.src = slides[index].imagen;
    title.textContent = slides[index].nombre;
    subtitle.textContent = slides[index].descripcion;

    function changeSlide() {
      index = (index + 1) % slides.length;
      const { imagen, nombre, descripcion } = slides[index];
      banner.style.opacity = 0;
      setTimeout(() => {
        banner.src = imagen;
        title.textContent = nombre;
        subtitle.textContent = descripcion;
        banner.style.opacity = 1;
      }, 1000);
    }

    setInterval(changeSlide, 4000);
  } catch (error) {
    console.error("Error al cargar el banner:", error);
  }
}
