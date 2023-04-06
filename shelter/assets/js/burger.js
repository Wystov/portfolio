const burgerBtn = document.querySelector('.burger');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav__link');
const overlay = document.querySelector('.overlay');

function toggleNav() {
    nav.classList.toggle('nav--active');
    burgerBtn.classList.toggle('burger--active');
    overlay.classList.toggle('overlay--active');
    document.body.classList.toggle('no-scroll');
    burgerLinksClick()
}

function burgerLinksClick() {
    if (nav.classList.contains('nav--active')) {
        navLinks.forEach(link => link.addEventListener('click', toggleNav));
    } else {
        navLinks.forEach(link => link.removeEventListener('click', toggleNav));
    }
}

export { burgerBtn, nav, navLinks, overlay, toggleNav };