console.log(`

`)

const btnLeft = document.querySelector('.slider__left');
const btnRight = document.querySelector('.slider__right');
const container = document.querySelector('.slider__content');
const prevPage = document.querySelector('.prev-page');
const currentPage = document.querySelector('.current-page');
const nextPage = document.querySelector('.next-page');

const contentPrev = new Set;
const contentCurrent = new Set;
const contentNext = new Set;




// CARD CONTENT

function getRandom(min, max) {
   return Math.floor(Math.random() * (max - min) + min);
}

function createCards(petsData, page, set) {
   const random = getRandom(0, 8);
   if (!contentPrev.has(petsData[random]) &&
      !contentCurrent.has(petsData[random]) &&
      !contentNext.has(petsData[random])) {
      set.add(petsData[random]);
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
      createCards(petsData, page, set)
   }
}


async function getData() {
   const data = '../../assets/data/pets.json';
   const res = await fetch(data);
   const petsData = await res.json();

   for (let i = 0; i < 3; i++) {
      createCards(petsData, prevPage, contentPrev);
   }

   for (let i = 0; i < 3; i++) {
      createCards(petsData, currentPage, contentCurrent);
   }

   for (let i = 0; i < 3; i++) {
      createCards(petsData, nextPage, contentNext);
   }
}

getData()


// SLIDER

btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);

function moveLeft() {
   container.classList.add('slider__content--move-left');
   setTimeout(() => container.classList.remove('slider__content--move-left'), 600)
}

function moveRight() {
   container.classList.add('slider__content--move-right');
   setTimeout(() => container.classList.remove('slider__content--move-right'), 600)
}

