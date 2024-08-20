// document.addEventListener('DOMContentLoaded', () => {
//     const header = document.querySelector('.cabecera');
//     const sections = document.querySelectorAll('section');

//     const observerOptions = {
//         root: null,
//         rootMargin: '0px',
//         threshold: 0.5
//     };

//     const observerCallback = (entries) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 const sectionId = entry.target.getAttribute('id');
//                 header.classList.remove('nosotros', 'menu', 'seccion3');
//                 if (sectionId) {
//                     header.classList.add(sectionId);
//                 }
//             }
//         });
//     };

//     const observer = new IntersectionObserver(observerCallback, observerOptions);

//     sections.forEach(section => {
//         observer.observe(section);
//     });
// });
