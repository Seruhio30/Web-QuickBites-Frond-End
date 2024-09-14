// // send.js

// document.addEventListener('DOMContentLoaded', () => {
//     const envioRadios = document.querySelectorAll('input[name="envio"]');
//     const envioDetalle = document.getElementById('envio-detalle');

//     // Función para manejar el cambio en las opciones de envío
//     function handleEnvioChange() {
//         const selectedEnvio = document.querySelector('input[name="envio"]:checked');
        
//         if (selectedEnvio.value === 'enviar') {
//             envioDetalle.style.display = 'block';
//             localStorage.setItem('envio', JSON.stringify({ tipo: 'enviar', costo: 1000 }));
//         } else {
//             envioDetalle.style.display = 'none';
//             localStorage.setItem('envio', JSON.stringify({ tipo: 'recoger', costo: 0 }));
//         }
        
//         console.log('Opción de envío seleccionada:', localStorage.getItem('envio'));
//     }

//     // Añadir event listeners a los radios de envío
//     envioRadios.forEach(radio => {
//         radio.addEventListener('change', handleEnvioChange);
//     });
// });

// send.js

document.addEventListener('DOMContentLoaded', () => {
    const envioRadios = document.querySelectorAll('input[name="envio"]');
    const envioDetalle = document.getElementById('envio-detalle');

    function handleEnvioChange() {
        const selectedEnvio = document.querySelector('input[name="envio"]:checked');
        
        if (selectedEnvio.value === 'enviar') {
            envioDetalle.style.display = 'block';
            localStorage.setItem('envio', JSON.stringify({ tipo: 'enviar', costo: 1000 }));
        } else {
            envioDetalle.style.display = 'none';
            localStorage.setItem('envio', JSON.stringify({ tipo: 'recoger', costo: 0 }));
        }
        
        mostrarResumenPedido();
    }

    envioRadios.forEach(radio => {
        radio.addEventListener('change', handleEnvioChange);
    });
});
