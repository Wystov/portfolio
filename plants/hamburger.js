const hamburger = document.querySelector(".hamburger");
const headerNav = document.querySelector(".header_navigation_list");
const navLink = document.querySelectorAll(".header_navigation_list li a");

hamburger.addEventListener("click", hamburgerMenu);

function hamburgerMenu() {
    hamburger.classList.toggle("active");
    headerNav.classList.toggle("active");
}

navLink.forEach(n => n.addEventListener("click", hideMenu));
document.addEventListener("click", (x) => {
    if (x.target !== headerNav && x.target !== hamburger) {
    hideMenu();
    }
});

function hideMenu() {
    hamburger.classList.remove("active");
    headerNav.classList.remove("active");
}


