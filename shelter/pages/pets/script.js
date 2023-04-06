import { petsData, getData } from '../../assets/js/get-data.js';
import { burgerBtn, nav, overlay, toggleNav } from '../../assets/js/burger.js';
import { popUp, popUpCloseBtn, showPopup, closePopUp } from '../../assets/js/popup.js';
import { selfEsteem } from '../../assets/js/self-esteem.js';
import { testData } from '../../assets/js/test-data.js';

window.onload = async function () {
   await getData()
   setCardsOnPage()
}

selfEsteem()

const btnToStart = document.querySelector('.slider-btns__double-back');
const btnToEnd = document.querySelector('.slider-btns__double-forward');
const btnPrev = document.querySelector('.slider-btns__back');
const btnNext = document.querySelector('.slider-btns__forward');
const pageNum = document.querySelector('.slider-btns__current');

const btnState = {
   prevActive: false,
   nextActive: true
}

const container = document.querySelector('.pets__slider');

btnNext.addEventListener('click', buttonHandler);
btnToEnd.addEventListener('click', buttonHandler);
burgerBtn.addEventListener('click', toggleNav);

const pagesContent = [];

let cardsOnPage = 8;
let currentPage = 1;

const media969 = window.matchMedia('(max-width: 969px)');
const media639 = window.matchMedia('(max-width: 639px)');

media969.addEventListener('change', setCardsOnPage);
media639.addEventListener('change', setCardsOnPage);

function setCardsOnPage() {
   if (media639.matches) {
      cardsOnPage = 3;
   } else if (media969.matches) {
      cardsOnPage = 6;
   } else {
      cardsOnPage = 8;
   }

   if (pagesContent.length) {
      currentPage = 1;
      createCards()
   } else {
      createDataArray()
   }
}

function getRandom(min, max) {
   return Math.floor(Math.random() * (max - min + 1) + min);
}

function createDataArray() {
   let prev = [];
   const clonePetsData = petsData.map(el => ({ ...el, count: 0 }));
   clonePetsData.sort(() => Math.random() - Math.random());
   for (let i = 0; i < 48 / 8; i++) {
      const onePageContent = [];
      clonePetsData.sort(() => Math.random() - Math.random());
      while (onePageContent.length < 8) {
         const pet = clonePetsData.shift();
         if (pet.count < 6) {
            onePageContent.push(pet);
            pet.count += 1;
         }
         clonePetsData.push(pet);
      }

      if (prev.length) {
         for (let j = 0; j < prev.length; j++) {
            const index = onePageContent.indexOf(prev[j]);
            if (index < prev.length) {
               const movePet = onePageContent.splice(index, 1)[0];
               onePageContent.splice(getRandom(5, 7), 0, movePet)
            }
         }
      }
      pagesContent.push(...onePageContent);
      prev = onePageContent.slice(onePageContent.length - 5, onePageContent.length);
   }
   testData(pagesContent)
   createCards()
}

function createCards() {
   container.innerHTML = '';
   for (let i = cardsOnPage * currentPage - cardsOnPage; i < cardsOnPage * currentPage; i++) {
      const card = document.createElement('div');
      card.classList.add('pets__card', 'card');
      const cardImg = document.createElement('div');
      cardImg.classList.add('card__img', `${pagesContent[i].img}`);
      const cardName = document.createElement('div');
      cardName.classList.add('card__name');
      cardName.textContent = `${pagesContent[i].name}`;
      const button = document.createElement('a');
      button.classList.add('card__button', 'button');
      button.textContent = 'Learn more';
      card.append(cardImg, cardName, button);
      container.append(card);
      card.addEventListener('click', () => showPopup(pagesContent[i]));
   }
   pageNum.textContent = currentPage;
   deactivateArrows()
}

function buttonHandler(event) {
   if (event.target.classList.contains('slider-btns__double-back')) {
      currentPage = 1;
   } else if (event.target.classList.contains('slider-btns__double-forward')) {
      currentPage = pagesContent.length / cardsOnPage;
   } else if (event.target.classList.contains('slider-btns__back')) {
      currentPage -= 1;
   } else if (event.target.classList.contains('slider-btns__forward')) {
      currentPage += 1;
   }
   createCards()
}

function deactivateArrows() {
   if (currentPage === 1) {
      btnToStart.classList.add('slider-btns__double-back--inactive');
      btnPrev.classList.add('slider-btns__back--inactive')
      btnPrev.removeEventListener('click', buttonHandler);
      btnToStart.removeEventListener('click', buttonHandler)
      btnState.prevActive = false;
   } else if (!btnState.prevActive) {
      btnToStart.classList.remove('slider-btns__double-back--inactive');
      btnPrev.classList.remove('slider-btns__back--inactive');
      btnPrev.addEventListener('click', buttonHandler);
      btnToStart.addEventListener('click', buttonHandler)
      btnState.prevActive = true;
   }

   if (currentPage === pagesContent.length / cardsOnPage) {
      btnToEnd.classList.add('slider-btns__double-forward--inactive');
      btnNext.classList.add('slider-btns__forward--inactive')
      btnNext.removeEventListener('click', buttonHandler);
      btnToEnd.removeEventListener('click', buttonHandler)
      btnState.nextActive = false;
   } else if (!btnState.nextActive) {
      btnToEnd.classList.remove('slider-btns__double-forward--inactive');
      btnNext.classList.remove('slider-btns__forward--inactive');
      btnNext.addEventListener('click', buttonHandler);
      btnToEnd.addEventListener('click', buttonHandler);
      btnState.nextActive = true;
   }
}

// POPUP

popUpCloseBtn.addEventListener('click', closePopUp);
overlay.addEventListener('click', () => {
   if (popUp.classList.contains('pop-up--active')) closePopUp();
   if (nav.classList.contains('nav--active')) toggleNav();
})
