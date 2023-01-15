const hamburger = document.querySelector(".hamburger");
const headerNav = document.querySelector(".header_navigation_list");
const navLink = document.querySelectorAll(".header_navigation_list li a");

function hamburgerMenu() {
    hamburger.classList.toggle("active");
    headerNav.classList.toggle("active");
}

hamburger.addEventListener("click", hamburgerMenu);
navLink.forEach(n => n.addEventListener("click", hamburgerMenu));
document.addEventListener("click", (x) => {
    if (headerNav.classList.contains("active") && 
       !(headerNav.contains(x.target)) &&
       !(hamburger.contains(x.target))) {
    hamburgerMenu();
    }
});







