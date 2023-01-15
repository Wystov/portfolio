// HAMBURGER

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

// SERVICE FOCUS

const btnGarden = document.querySelector(".button_garden");
const btnLawn = document.querySelector(".button_lawn");
const btnPlanting = document.querySelector(".button_planting");
const cardGarden = document.querySelectorAll(".card_garden");
const cardLawn = document.querySelectorAll(".card_lawn");
const cardPlanting = document.querySelectorAll(".card_planting");

btnGarden.addEventListener("click", activeCardGarden);
btnLawn.addEventListener("click", activeCardLawn);
btnPlanting.addEventListener("click", activeCardPlanting);

function activeCardGarden() {
    if (btnLawn.classList.contains("button_service_focus") &&
        btnPlanting.classList.contains("button_service_focus")) {
            return;
        }
    if (btnLawn.classList.contains("button_service_focus") ||
        btnPlanting.classList.contains("button_service_focus")) {
        cardGarden.forEach(card => card.classList.toggle("service_card_blur"));
    } else {
        cardLawn.forEach(card => card.classList.toggle("service_card_blur"));
        cardPlanting.forEach(card => card.classList.toggle("service_card_blur"));
    }
    btnGarden.classList.toggle("button_service_focus");
}

function activeCardLawn() {
    if (btnGarden.classList.contains("button_service_focus") &&
        btnPlanting.classList.contains("button_service_focus")) {
            return;
        }
    if (btnGarden.classList.contains("button_service_focus") ||
        btnPlanting.classList.contains("button_service_focus")) {
        cardLawn.forEach(card => card.classList.toggle("service_card_blur"));
    } else {
        cardGarden.forEach(card => card.classList.toggle("service_card_blur"));
        cardPlanting.forEach(card => card.classList.toggle("service_card_blur"));
    }
    btnLawn.classList.toggle("button_service_focus");
}

function activeCardPlanting() {
    if (btnGarden.classList.contains("button_service_focus") &&
        btnLawn.classList.contains("button_service_focus")) {
            return;
        }
    if (btnGarden.classList.contains("button_service_focus") ||
        btnLawn.classList.contains("button_service_focus")) {
        cardPlanting.forEach(card => card.classList.toggle("service_card_blur"));
    } else {
        cardGarden.forEach(card => card.classList.toggle("service_card_blur"));
        cardLawn.forEach(card => card.classList.toggle("service_card_blur"));
    }
    btnPlanting.classList.toggle("button_service_focus");
}









