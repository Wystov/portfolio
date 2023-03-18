console.log(`

`)

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

let petsData;

let pagesContent = [];
let onePageContent = [];

let cardsOnPage = 8;
let currentPage = 1;


async function getData() {
   const data = '../../assets/data/pets.json';
   const res = await fetch(data);
   petsData = await res.json();

   createDataArray()
}

getData()

function getRandom(min, max) {
   return Math.floor(Math.random() * (max - min) + min);
}

function createDataArray() {
   for (let i = 0; i < 6; i++) {
      while (onePageContent.length < cardsOnPage) {
         const random = getRandom(0, cardsOnPage);
         if (!onePageContent.includes(petsData[random])) {
            onePageContent.push(petsData[random]);
         }
      }
      pagesContent = [...pagesContent, ...onePageContent];
      onePageContent = [];
   }
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
   }
   pageNum.textContent = currentPage;
   deactivateArrows()
}

function buttonHandler(event) {
   console.log(event.target)
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






