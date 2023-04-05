import { petsData, getData } from '../../assets/js/get-data.js';
import { burgerBtn, nav, overlay, toggleNav } from '../../assets/js/burger.js';
import { popUp, popUpCloseBtn, showPopup, closePopUp } from '../../assets/js/popup.js';
import { selfEsteem } from '../../assets/js/self-esteem.js';

window.onload = async function () {
   await getData()
   setCardsOnPage()
   selfEsteem()
}

const btnToStart = document.querySelector('.slider-btns__double-back');
const btnToEnd = document.querySelector('.slider-btns__double-forward');
const btnPrev = document.querySelector('.slider-btns__back');
const btnNext = document.querySelector('.slider-btns__forward');
const pageNum = document.querySelector('.slider-btns__current');

let prevActive = false;
let nextActive = true;

const container = document.querySelector('.pets__slider');

btnNext.addEventListener('click', buttonHandler);
btnToEnd.addEventListener('click', buttonHandler);
burgerBtn.addEventListener('click', toggleNav);

let clonePetsData;

let pagesContent = [];
let onePageContent = [];

let cardsOnPage = 8;
let lastCardsOnPage;
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

   if (!pagesContent.length) {
      createDataArray()
   } else if (lastCardsOnPage !== cardsOnPage) {
      lastCardsOnPage = cardsOnPage;
      currentPage = 1;
      createCards()
   }
}

function getRandom(min, max) {
   return Math.floor(Math.random() * (max - min + 1) + min);
}

function createDataArray() {
   pagesContent = [];
   let lastTwo = [];
   clonePetsData = petsData.map(el => ({ ...el, count: 0 }));
   clonePetsData.sort(() => Math.random() - Math.random());
   for (let i = 0; i < 48 / 8; i++) {
      clonePetsData.sort(() => Math.random() - Math.random());
      while (onePageContent.length < 8) {
         const pet = clonePetsData.shift();
         if (pet.count < 6) {
            onePageContent.push(pet);
            pet.count += 1;
         }
         clonePetsData.push(pet);
      }
      if (lastTwo.length) {
         for (let i = 0; i < 2; i++) {
            const index = onePageContent.indexOf(lastTwo[i]);
            if (index < 4) {
               const movePet = onePageContent.splice(index, 1)[0];
               onePageContent.splice(getRandom(4, 8), 0, movePet);
            }
         }

      }
      pagesContent = [...pagesContent, ...onePageContent];
      lastTwo = onePageContent.slice(onePageContent.length - 2, onePageContent.length);
      onePageContent = [];
   }

   console.log(pagesContent)
   console.log(pagesContent.reduce((acc, val, i) => {
      if (i % 6 === 0) {
         acc.push([val, pagesContent[i + 1], pagesContent[i + 2], pagesContent[i + 3], pagesContent[i + 4], pagesContent[i + 5],]);
      }
      return acc;
   }, []))
   console.log(pagesContent.reduce((acc, val, i) => {
      if (i % 3 === 0) {
         acc.push([val, pagesContent[i + 1], pagesContent[i + 2]]);
      }
      return acc;
   }, []))

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
      prevActive = false;
   } else if (!prevActive) {
      btnToStart.classList.remove('slider-btns__double-back--inactive');
      btnPrev.classList.remove('slider-btns__back--inactive');
      btnPrev.addEventListener('click', buttonHandler);
      btnToStart.addEventListener('click', buttonHandler)
      prevActive = true;
   }

   if (currentPage === pagesContent.length / cardsOnPage) {
      btnToEnd.classList.add('slider-btns__double-forward--inactive');
      btnNext.classList.add('slider-btns__forward--inactive')
      btnNext.removeEventListener('click', buttonHandler);
      btnToEnd.removeEventListener('click', buttonHandler)
      nextActive = false;
   } else if (!nextActive) {
      btnToEnd.classList.remove('slider-btns__double-forward--inactive');
      btnNext.classList.remove('slider-btns__forward--inactive');
      btnNext.addEventListener('click', buttonHandler);
      btnToEnd.addEventListener('click', buttonHandler);
      nextActive = true;
   }
}

// POPUP

popUpCloseBtn.addEventListener('click', closePopUp);
overlay.addEventListener('click', () => {
   if (popUp.classList.contains('pop-up--active')) closePopUp();
   if (nav.classList.contains('nav--active')) toggleNav();
})
