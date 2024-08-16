let lastScrollTop = 0;
let timeout;

window.addEventListener('scroll', function() {
    clearTimeout(timeout);

    const header = document.querySelector('.cabecera');
    const nosotros = document.querySelector('#nosotros').offsetTop - 50;
    const menu = document.querySelector('#menu').offsetTop - 50;
    const section3 = document.querySelector('#seccion3') ? document.querySelector('#seccion3').offsetTop - 50 : Infinity;
    const scrollPos = window.scrollY;

    // Solo cambia la clase si el scroll ha cambiado significativamente
    if (Math.abs(scrollPos - lastScrollTop) > 10) {
        timeout = setTimeout(() => {
            if (scrollPos >= nosotros && scrollPos < menu) {
                if (!header.classList.contains('nosotros')) {
                    header.classList.remove('menu', 'seccion3');
                    header.classList.add('nosotros');
                }
            } else if (scrollPos >= menu && scrollPos < section3) {
                if (!header.classList.contains('menu')) {
                    header.classList.remove('nosotros', 'seccion3');
                    header.classList.add('menu');
                }
            } else if (scrollPos >= section3) {
                if (!header.classList.contains('seccion3')) {
                    header.classList.remove('nosotros', 'menu');
                    header.classList.add('seccion3');
                }
            } else {
                if (header.classList.contains('nosotros') || header.classList.contains('menu') || header.classList.contains('seccion3')) {
                    header.classList.remove('nosotros', 'menu', 'seccion3');
                }
            }
            lastScrollTop = scrollPos;
        }, 50); // Ajusta el tiempo según sea necesario
    }
});
