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

// PRICE ACCORDION

const btnBasics = document.querySelectorAll(".basics_btn");
const divBasics = document.querySelectorAll(".price_basics");
btnBasics.forEach(btn => btn.addEventListener("click", expandAccB));
const btnStandard = document.querySelectorAll(".standard_btn");
const divStandard = document.querySelectorAll(".price_standard");
btnStandard.forEach(btn => btn.addEventListener("click", expandAccS));
const btnPro = document.querySelectorAll(".pro_btn");
const divPro = document.querySelectorAll(".price_pro");
btnPro.forEach(btn => btn.addEventListener("click", expandAccP));
const divExpand = document.querySelectorAll(".price_item_expand");
let isActiveExpand = [];
let activeName = '';

function expandAccB() {
    if (isActiveExpand.length === 0) {
        divBasics.forEach(div => div.classList.toggle("price_item_active"));
        isActiveExpand = divBasics;
        activeName = 'basics';
    }
    else if (activeName === 'basics') {
        divBasics.forEach(div => div.classList.toggle("price_item_active"));
        isActiveExpand = [];
        activeName = "";
    }
    else if (activeName !== 'basics' && isActiveExpand.length > 0) {
        isActiveExpand.forEach(div => div.classList.toggle("price_item_active"));
        divBasics.forEach(div => div.classList.toggle("price_item_active"));
        isActiveExpand = divBasics;
        activeName = 'basics';
    }
}

function expandAccS() {
    if (isActiveExpand.length === 0) {
        divStandard.forEach(div => div.classList.toggle("price_item_active"));
        isActiveExpand = divStandard;
        activeName = 'standard';
    }
    else if (activeName === 'standard') {
        divStandard.forEach(div => div.classList.toggle("price_item_active"));
        isActiveExpand = [];
        activeName = "";
    }
    else if (activeName !== 'standard' && isActiveExpand.length > 0) {
        isActiveExpand.forEach(div => div.classList.toggle("price_item_active"));
        divStandard.forEach(div => div.classList.toggle("price_item_active"));
        isActiveExpand = divStandard;
        activeName = 'standard';
    }
}

function expandAccP() {
    if (isActiveExpand.length === 0) {
        divPro.forEach(div => div.classList.toggle("price_item_active"));
        isActiveExpand = divPro;
        activeName = 'pro';
    }
    else if (activeName === 'pro') {
        divPro.forEach(div => div.classList.toggle("price_item_active"));
        isActiveExpand = [];
        activeName = '';
    }
    else if (activeName !== 'pro' && isActiveExpand.length > 0) {
        isActiveExpand.forEach(div => div.classList.toggle("price_item_active"));
        divPro.forEach(div => div.classList.toggle("price_item_active"));
        isActiveExpand = divPro;
        activeName = 'pro';
    }
}

// CONTACTS SELECT

const contactSelect = document.querySelector(".contact_city_select");
contactSelect.addEventListener("click", contactExpand);
const cityDrop = document.querySelector(".city_drop");
cityDrop.addEventListener("click", contactExpand);
const cityCan = document.querySelector(".canandaigua");
cityCan.addEventListener("click", showCityCan);
const displayCity = document.querySelector(".contact_show");

function contactExpand() {
    contactSelect.classList.toggle("city_active");
    cityDrop.classList.toggle("city_drop_active");
}

function showCityCan() {
    if (displayCity.classList.contains("contact_show_active")) {
        return;
    } 
    displayCity.classList.toggle("contact_show_active");
}
