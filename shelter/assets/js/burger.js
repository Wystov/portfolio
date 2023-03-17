const burgerBtn = document.querySelector('.burger');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav__link');
const overlay = document.querySelector('.overlay');
const logo = document.querySelector('.logo');
burgerBtn.addEventListener('click', toggleNav);
overlay.addEventListener('click', toggleNav);
navLinks.forEach(link => link.addEventListener('click', toggleNav));

function toggleNav(event) {
    nav.classList.toggle('nav--active');
    burgerBtn.classList.toggle('burger--active');
    overlay.classList.toggle('overlay--active');
    logo.classList.toggle('logo--active');
    document.body.classList.toggle('no-scroll');
}