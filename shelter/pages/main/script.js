console.log(`

`)

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


async function getData() {
   const data = '../../assets/data/pets.json';
   const res = await fetch(data);
   petsData = await res.json();

   for (let i = 0; i < 3; i++) {
      createCards(petsData, currentPage, contentCurrent, contentNext);
   }
}

getData()


// SLIDER

btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);

function moveLeft() {
   if (contentPrev.length) {

   } else {
      contentPrev = [];
      for (let i = 0; i < 3; i++) {
         createCards(petsData, prevPage, contentPrev, contentCurrent);
      }
   }

   container.classList.add('slider__content--move-left');
   btnLeft.removeEventListener('click', moveLeft);

   setTimeout(() => {
      nextPage.innerHTML = currentPage.innerHTML;
      contentNext = [...contentCurrent];
      currentPage.innerHTML = prevPage.innerHTML;
      contentCurrent = [...contentPrev];
      prevPage.innerHTML = '';
      contentPrev = [];
      container.classList.remove('slider__content--move-left')
      btnLeft.addEventListener('click', moveLeft);
      console.log(contentPrev, contentCurrent, contentNext)
   }, 800)
}

function moveRight() {
   if (contentNext.length) {

   } else {
      contentNext = [];
      for (let i = 0; i < 3; i++) {
         createCards(petsData, nextPage, contentNext, contentCurrent);
      }
   }

   container.classList.add('slider__content--move-right');
   btnRight.removeEventListener('click', moveRight);
   setTimeout(() => {
      prevPage.innerHTML = currentPage.innerHTML;
      contentPrev = [...contentCurrent];
      currentPage.innerHTML = nextPage.innerHTML;
      contentCurrent = [...contentNext];
      nextPage.innerHTML = '';
      contentNext = [];
      container.classList.remove('slider__content--move-right')
      btnRight.addEventListener('click', moveRight);
      console.log(contentPrev, contentCurrent, contentNext)
   }, 800)
}

