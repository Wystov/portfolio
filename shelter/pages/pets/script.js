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


async function getData() {
   const data = '../../assets/data/pets.json';
   const res = await fetch(data);
   petsData = await res.json();

   setCardsOnPage()
}

getData()

function setCardsOnPage() {
   if (media639.matches) {
      cardsOnPage = 3;
   } else if (media969.matches) {
      cardsOnPage = 6;
   } else {
      cardsOnPage = 8;
   }

   if (lastCardsOnPage !== cardsOnPage) {
      lastCardsOnPage = cardsOnPage;
      currentPage = currentPage === 1 ? 1 : currentPage > 6 ? 6 : currentPage;
      createDataArray()
   }
}

function createDataArray() {
   pagesContent = [];
   clonePetsData = petsData.map(el => ({ ...el, count: 0 }));
   clonePetsData.sort(() => Math.random() - Math.random());
   for (let i = 0; i < 48 / cardsOnPage; i++) {
      if (cardsOnPage === 8) {
         clonePetsData.sort(() => Math.random() - Math.random());
      }
      while (onePageContent.length < cardsOnPage) {
         const pet = clonePetsData.shift();
         if (pet.count < 6) {
            onePageContent.push(pet);
            pet.count += 1;
         }
         clonePetsData.push(pet);
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

const popUp = document.querySelector('.pop-up');
const popUpImg = document.querySelector('.pop-up__img');
const popUpName = document.querySelector('.pop-up__name');
const popUpType = document.querySelector('.pop-up__type');
const popUpDescription = document.querySelector('.pop-up__description');
const popUpAge = document.querySelector('.pop-up__age');
const popUpInoculations = document.querySelector('.pop-up__inoculations');
const popUpDiseases = document.querySelector('.pop-up__diseases');
const popUpParasites = document.querySelector('.pop-up__parasites');
const overlay = document.querySelector('.overlay');

const popUpCloseBtn = document.querySelector('.pop-up__close-btn');
popUpCloseBtn.addEventListener('click', closePopUp);
overlay.addEventListener('click', () => {
   if (popUp.classList.contains('pop-up--active')) closePopUp();
})



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
}

function closePopUp() {
   popUp.classList.remove('pop-up--active');
   popUpImg.classList.remove(`${popUpImg.classList[1]}`)
   overlay.classList.remove('overlay--active');
}
