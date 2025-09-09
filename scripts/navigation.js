export function navigation() {
    //store the selected elements tha we are going to use.
    const navButtom = document.querySelector('#hamburger');
    const navLinks = document.querySelector('#nav-bar');
    //toggle the show class off and on
    navButtom.addEventListener('click', () => {
        navButtom.classList.toggle('show')
        navLinks.classList.toggle('show')
    });
}