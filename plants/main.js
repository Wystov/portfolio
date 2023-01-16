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
contactSelect.addEventListener("click", contactDropDown);
const cityDrop = document.querySelector(".city_drop");
cityDrop.addEventListener("click", contactDropDown);
const displayCity = document.querySelector(".contact_show");
const cityVariants = document.querySelectorAll(".city_variant");
cityVariants.forEach(city => city.addEventListener("click", showCity));
const valueCity = document.querySelector(".value_city");
const valuePhone = document.querySelector(".value_phone");
const valueAdress = document.querySelector(".value_adress");
const selectCity = document.querySelector(".select_city");
const callBtn = document.querySelector(".contact_show_call_btn");

function contactDropDown() {
    contactSelect.classList.toggle("city_active");
    cityDrop.classList.toggle("city_drop_active");
}

function showCity() {
    if (this.classList.contains("canandaigua")) {
        valueCity.innerHTML="Canandaigua, NY";
        valuePhone.innerHTML="+1 585 393 0001";
        valueAdress.innerHTML="151 Charlotte Street";
        selectCity.innerHTML="Canandaigua, NY";
        callBtn.href="tel:+1-585-393-0001"
    }
    if (this.classList.contains("newyork")) {
        valueCity.innerHTML="New York City";
        valuePhone.innerHTML="+1 212 456 0002";
        valueAdress.innerHTML="9 East 91st Street";
        selectCity.innerHTML="New York City";
        callBtn.href="tel:+1-212-456-0002";
    }
    if (this.classList.contains("yonkers")) {
        valueCity.innerHTML="Yonkers, NY";
        valuePhone.innerHTML="+1 914 678 0003";
        valueAdress.innerHTML="511 Warburton Ave";
        selectCity.innerHTML="Yonkers, NY";
        callBtn.href="tel:+1-914-678-0003";
    }
    if (this.classList.contains("sherill")) {
        valueCity.innerHTML="Sherrill, NY";
        valuePhone.innerHTML="+1 315 908 0004";
        valueAdress.innerHTML="14 WEST Noyes BLVD";
        selectCity.innerHTML="Sherrill, NY";
        callBtn.href="tel:+1-315-908-0004";
    }
    if (displayCity.classList.contains("contact_show_active")) {
        return;
    } 
    displayCity.classList.toggle("contact_show_active");
}
