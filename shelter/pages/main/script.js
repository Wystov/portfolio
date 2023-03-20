console.log(`

`)

import { burgerBtn, nav, navLinks, logo, overlay, toggleNav } from '../../assets/js/burger.js';

burgerBtn.addEventListener('click', toggleNav);
navLinks.forEach(link => link.addEventListener('click', toggleNav));

const btnLeft = document.querySelector('.slider__left');
const btnRight = document.querySelector('.slider__right');
const container = document.querySelector('.slider__content');
const prevPage = document.querySelector('.prev-page');
const currentPage = document.querySelector('.current-page');
const nextPage = document.querySelector('.next-page');

let petsData;

let contentPrev = [];
let contentCurrent = [];
let contentNext = [];

let cardsCount;

const media1240 = window.matchMedia('(max-width: 1240px)');
const media750 = window.matchMedia('(max-width: 750px)');

media1240.addEventListener('change', setCardsCount);
media750.addEventListener('change', setCardsCount);

function setCardsCount() {
   prevPage.innerHTML = '';
   currentPage.innerHTML = '';
   nextPage.innerHTML = '';
   contentPrev = [];
   contentCurrent = [];
   contentNext = [];
   if (media750.matches) {
      cardsCount = 1;
      createCurrentPage()
   } else if (media1240.matches) {
      cardsCount = 2;
      createCurrentPage()
   } else {
      cardsCount = 3;
      createCurrentPage()
   }
}

// CARD CONTENT

function getRandom(min, max) {
   return Math.floor(Math.random() * (max - min) + min);
}

function createCards(petsData, page, set, nextSet) {
   const random = getRandom(0, 8);
   if (!set.includes(random) && !nextSet.includes(random)) {
      set.push(random);
      const card = document.createElement('div');
      card.classList.add('pets__card', 'card');
      const cardImg = document.createElement('div');
      cardImg.classList.add('card__img', `${petsData[random].img}`);
      const cardName = document.createElement('div');
      cardName.classList.add('card__name');
      cardName.textContent = `${petsData[random].name}`;
      const button = document.createElement('a');
      button.classList.add('card__button', 'button');
      button.textContent = 'Learn more';
      card.append(cardImg, cardName, button);
      page.append(card);
   } else {
      createCards(petsData, page, set, nextSet)
   }
}

function createCurrentPage() {
   for (let i = 0; i < cardsCount; i++) {
      createCards(petsData, currentPage, contentCurrent, contentNext);
   }
}


async function getData() {
   const data = '../../assets/data/pets.json';
   const res = await fetch(data);
   petsData = await res.json();

   setCardsCount()
}

getData()


// SLIDER

btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);

function moveLeft() {
   if (!contentPrev.length) {
      contentPrev = [];
      for (let i = 0; i < cardsCount; i++) {
         createCards(petsData, prevPage, contentPrev, contentCurrent);
      }
   }

   container.classList.add('slider__content--move-left');
   btnLeft.removeEventListener('click', moveLeft);
   btnRight.removeEventListener('click', moveRight);

   setTimeout(() => {
      nextPage.innerHTML = currentPage.innerHTML;
      contentNext = [...contentCurrent];
      currentPage.innerHTML = prevPage.innerHTML;
      contentCurrent = [...contentPrev];
      prevPage.innerHTML = '';
      contentPrev = [];
      container.classList.remove('slider__content--move-left')
      btnLeft.addEventListener('click', moveLeft);
      btnRight.addEventListener('click', moveRight);
   }, 1000)
}

function moveRight() {
   if (!contentNext.length) {
      contentNext = [];
      for (let i = 0; i < cardsCount; i++) {
         createCards(petsData, nextPage, contentNext, contentCurrent);
      }
   }

   container.classList.add('slider__content--move-right');
   btnLeft.removeEventListener('click', moveLeft);
   btnRight.removeEventListener('click', moveRight);
   setTimeout(() => {
      prevPage.innerHTML = currentPage.innerHTML;
      contentPrev = [...contentCurrent];
      currentPage.innerHTML = nextPage.innerHTML;
      contentCurrent = [...contentNext];
      nextPage.innerHTML = '';
      contentNext = [];
      container.classList.remove('slider__content--move-right')
      btnLeft.addEventListener('click', moveLeft);
      btnRight.addEventListener('click', moveRight);
   }, 1000)
}

