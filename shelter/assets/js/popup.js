import { overlay } from "../../assets/js/burger.js";
const popUp = document.querySelector('.pop-up');
const popUpImg = document.querySelector('.pop-up__img');
const popUpName = document.querySelector('.pop-up__name');
const popUpType = document.querySelector('.pop-up__type');
const popUpDescription = document.querySelector('.pop-up__description');
const popUpAge = document.querySelector('.pop-up__age');
const popUpInoculations = document.querySelector('.pop-up__inoculations');
const popUpDiseases = document.querySelector('.pop-up__diseases');
const popUpParasites = document.querySelector('.pop-up__parasites');
const popUpCloseBtn = document.querySelector('.pop-up__close-btn');

function showPopup(content) {
    popUpImg.classList.add(`${content.img}`);
    popUpName.textContent = content.name;
    popUpType.textContent = content.type;
    popUpDescription.textContent = content.description;
    popUpAge.textContent = content.age;
    popUpInoculations.textContent = content.inoculations;
    popUpDiseases.textContent = content.diseases;
    popUpParasites.textContent = content.parasites;

    popUp.classList.add('pop-up--active');
    overlay.classList.add('overlay--active');
    document.body.classList.add('no-scroll');
}

function closePopUp() {
    popUp.classList.remove('pop-up--active');
    popUpImg.classList.remove(`${popUpImg.classList[1]}`)
    overlay.classList.remove('overlay--active');
    document.body.classList.remove('no-scroll');
}

export { popUp, popUpImg, popUpName, popUpType, popUpDescription, popUpAge, popUpInoculations, popUpDiseases, popUpParasites, popUpCloseBtn, showPopup, closePopUp }