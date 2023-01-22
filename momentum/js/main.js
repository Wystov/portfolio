const time = document.querySelector('.time');
const date = document.querySelector('date');
const dateOptions = {weekday: 'long', day: 'numeric', month: 'long'};
let newDate = new Date();
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
name.addEventListener("keydown", nameBlur);
window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);
let language = 'en';
const greetingTranslate = {'en': 'Good', 'ru': 'Добр'};
const dateTranslate = {'en': 'en-US', 'ru': 'ru-RU'};
const placeHolder = {'en': '[Enter your name]', 'ru': '[Введите ваше имя]'}
name.placeholder = placeHolder[language];

// 1. time

function showTime() {
    newDate = new Date();
    const currentTime = newDate.toLocaleTimeString();
    time.textContent = currentTime;

    showDate()
    showGreeting()
 
    setTimeout(showTime, 1000);
}

showTime()

function showDate() {
    const currentDate = newDate.toLocaleDateString(dateTranslate[language], dateOptions);
    date.textContent = currentDate;
}

function getTimeOfDay() {
    const hours = newDate.getHours();
    if (hours >= 0 && hours <= 5) {
        return 'night';
    } else if (hours >= 6 && hours <= 1) {
        return 'morning';
    } else if (hours >= 12 && hours <= 17) {
        return 'afternoon';
    } else {
        return 'evening';
    }
}

// 2. greeting


function showGreeting() {
    const timeOfDay = getTimeOfDay();
    let ruGreetingText;
    const greetingText = `${greetingTranslate[language]} ${timeOfDay},`;
    greeting.textContent = greetingText;
    if (language === 'ru') {
        if (timeOfDay === 'night') {
            ruGreetingText = 'ой ночи';
        } else if (timeOfDay === 'morning') {
            ruGreetingText = 'ое утро';
        } else if (timeOfDay === 'afternoon') {
            ruGreetingText = 'ый день';
        } else if (timeOfDay === 'evening') {
            ruGreetingText = 'ый вечер';
        }
        const greetingText = `${greetingTranslate[language]}${ruGreetingText},`;
        greeting.textContent = greetingText;
    }
}



function setLocalStorage() {
    localStorage.setItem('name', name.value);
    localStorage.setItem('city', city.value);
}

function getLocalStorage() {
    if (localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
        name.blur();
    }
    if (localStorage.getItem('city')) {
        city.value = localStorage.getItem('city');
        getWeather()
    }
}

function nameBlur (key) {
    if (key.keyCode === 13) {
      this.blur();
    }
}

// 3. picture slider

const prevBtn = document.querySelector('.slide-prev');
prevBtn.addEventListener('click', getSlidePrev);
const nextBtn = document.querySelector('.slide-next');
nextBtn.addEventListener('click', getSlideNext);

let randomNum;

function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomNum(1, 20);

async function setUnsplashImg() {
    const timeOfDay = getTimeOfDay();
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=$${timeOfDay}&client_id=iACCeWsc-4SZ87eKKf8UcfU-Z6Bd1iLAxt2OQ78OdoM`;
    const res = await fetch(url);
    const data = await res.json();
    const bgLink = data.urls.regular;
    const img = new Image();
    img.src = bgLink;
    img.onload = () => {      
    document.body.style.backgroundImage = `url(${bgLink})`;
    }
}

async function setFlickrImg() {
    const timeOfDay = getTimeOfDay();
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=987310a1ee8d1ff3e1e2b86eabe327d8&tags=${timeOfDay}&extras=url_l&format=json&nojsoncallback=1`;
    const res = await fetch(url);
    const data = await res.json();
    const bgNum = randomNum.toString()
    const bgLink = data.photos.photo[bgNum].url_l;
    const img = new Image();
    img.src = bgLink;
    img.onload = () => {
    document.body.style.backgroundImage = `url(${bgLink})`;
    }
}

let bgSrc = 'unsplash';

function setBg() {
    if (bgSrc === 'github') {
        const timeOfDay = getTimeOfDay();
        const bgNum = randomNum.toString().padStart(2, '0');
        const bgLink = `https://raw.githubusercontent.com/Wystov/momentum-img/main/img/${timeOfDay}/${bgNum}.webp`
        const img = new Image();
        img.src = bgLink;
        img.onload = () => {      
            document.body.style.backgroundImage = `url(${bgLink})`;
        }
    }
    if (bgSrc === 'unsplash') {
        setUnsplashImg()
    }
    if (bgSrc === 'flickr') {
        setFlickrImg()
    }
}

setBg()

function getSlideNext() {
    if (randomNum === 20) {
        randomNum = 1;
        setBg()
        return;
    } 
    randomNum += 1;
    setBg()
}

function getSlidePrev() {
    if (randomNum === 1) {
        randomNum = 20;
        setBg()
        return;
    } 
    randomNum -= 1;
    setBg()
}

// 4. weather

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const city = document.querySelector('.city');
const weatherError = document.querySelector('.weather-error');
const weatherContainer = document.querySelector('.weather-container');

const defaultCityTranslate = {'en': 'Minsk', 'ru': 'Минск'}
const defaultValue = defaultCityTranslate[language];
let storedValue = localStorage.getItem('city');

function checkCity() {
    if (!storedValue) {
        storedValue = defaultValue;
        city.value = storedValue;
    } else {
        storedValue = localStorage.getItem('city');
        city.value = storedValue;
    }
}


city.addEventListener('change', setLocalStorage);
city.addEventListener('change', getWeather);
city.addEventListener("keydown", nameBlur);


async function getWeather() {  
    checkCity()
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${storedValue}&lang=${language}&appid=8bfa64d27e5adae6d9aa62bd0fc92a2c&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.cod === '404' || city.value === '') {
        weatherContainer.classList.add('hide');
        weatherError.classList.remove('hide');
        return
    }
    weatherContainer.classList.remove('hide');
    weatherError.classList.add('hide');
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description.toUpperCase();
    const weatherTranslate = {en: ['Wind: ', 'Humidity: '], ru: ['Ветер: ', 'Влажность: ']}
    wind.textContent = `${weatherTranslate[language][0]}${Math.round(data.wind.speed)} m/s`;
    humidity.textContent = `${weatherTranslate[language][1]}${Math.round(data.main.humidity)}%`;
}

getWeather()

// 5. quote of the day

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');
changeQuote.addEventListener('click', getQuotes);
const quoteTranslate = {'en': 0, 'ru': 1};

let randomQuoteNum;

function getRandomQuoteNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    randomQuoteNum = Math.floor(Math.random() * (max - min + 1)) + min;
}

async function getQuotes() {  
    const quoteList = 'assets/data/quotes.json';
    const res = await fetch(quoteList);
    const data = await res.json(); 
    getRandomQuoteNum(0, 19);
    quote.textContent = data[quoteTranslate[language]][randomQuoteNum].quote;
    author.textContent = data[quoteTranslate[language]][randomQuoteNum].author;
}

getQuotes();

// 6. audioplayer

const audio = new Audio();
const playBtn = document.querySelector('.play');
playBtn.addEventListener('click', playAudio);
const playPrevBtn = document.querySelector('.play-prev');
playPrevBtn.addEventListener('click', playPrev)
const playNextBtn = document.querySelector('.play-next');
playNextBtn.addEventListener('click', playNext);
const playListContainer = document.querySelector('.play-list');
audio.addEventListener('ended', playNext);
const currentTitle = document.querySelector('.track-title');


let isPlay = false;
let playNum = 0;

import playList from './playList.js';

let playbackCurrentTime = 0;

function playAudio() {
    audio.src = playList[playNum].src;
    audio.currentTime = playbackCurrentTime;
    currentTitle.innerHTML = playList[playNum].title;
    if (!isPlay) {
        audio.play();
        isPlay = true;
        toggleBtn()
    } else {
        pauseAudio();
    }
    playListSwitch()
}

function pauseAudio() {
    audio.pause();
    isPlay = false;
    toggleBtn()
}

function toggleBtn() {
    if (isPlay) {
        playBtn.classList.add('pause');
    } else {
        playBtn.classList.remove('pause');
    }
}


function playNext() {
    if (playNum === 3) {
        playNum = 0;
    } else {
        playNum += 1;
    }
    playbackCurrentTime = 0;
    isPlay = false;
    playAudio();
}

function playPrev() {
    if (playNum === 0) {
        playNum = 3;
    } else {
    playNum -= 1;
    }
    playbackCurrentTime = 0;
    isPlay = false;
    playAudio();
}

playList.forEach(el => {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = el.title;
    playListContainer.append(li);
});


const playItem = playListContainer.querySelectorAll('.play-item');


function playListSwitch() {
    playItem.forEach(el => {
        if (playList[playNum].title === el.textContent) {
            el.classList.add('item-active');
        } else {
            el.classList.remove('item-active');
        }
        if (playList[playNum].title === el.textContent && isPlay == true) {
            el.classList.add('item-played');
        } else {
            el.classList.remove('item-played');
        }
    });
}

// pro audioplayer

audio.addEventListener('timeupdate', setPlaybackCurrentTime);
const trackTime = document.querySelector('.track-time');
const progressBar = document.querySelector('.progress-bar');
const timeline = document.querySelector('.timeline');
progressBar.addEventListener('click', changeTimeline);
const audioMuteBtn = document.querySelector('.audio-active');
audioMuteBtn.addEventListener('click', audioMute);
const volume = document.querySelector('.volume');
const currentVolume = document.querySelector('.current-volume');
volume.addEventListener('click', setVolume);



function setPlaybackCurrentTime() {
    showMinutes()
    playbackCurrentTime = audio.currentTime;
    const currentTimePercent = (audio.currentTime / audio.duration) * 100;
    timeline.style.width = currentTimePercent + '%';
} 

function changeTimeline(e) {
    const clickTime = (e.offsetX / progressBar.offsetWidth) * audio.duration;
    audio.currentTime = clickTime;
}

function audioMute() {
    audio.muted = !audio.muted;
    audioMuteBtn.classList.toggle('audio-muted');
}

function setVolume(e) {
    const clickVolume = (e.offsetX / volume.offsetWidth);
    audio.volume = clickVolume;
    currentVolume.style.width = (clickVolume * 100) + '%';
}

function showMinutes() {
    if (isNaN(audio.duration)) {
        return;
    }
    let minCur = Math.floor(audio.currentTime / 60);
    let secCur = Math.floor(audio.currentTime % 60);
    let minTotal = Math.floor(audio.duration / 60);
    let secTotal = Math.floor(audio.duration % 60);
    if (secCur < 10) {
        secCur = '0' + secCur.toString();
    }
    if (secTotal < 10) {
        secTotal = '0' + secTotal.toString();
    }
    trackTime.innerHTML = minCur + ':' + secCur + ' / ' + minTotal + ':' + secTotal;
}

playItem.forEach(el => el.addEventListener('click', chooseTrack))

function chooseTrack() {
    playList.forEach(el => {
        if (el.title === this.innerHTML && playNum == el.index) {
            this.classList.toggle('item-played');
            playAudio()
        } else if (el.title === this.innerHTML) {
            playItem.forEach(el => el.classList.remove('item-played'));
            this.classList.toggle('item-played');
            playNum = +el.index;
            isPlay = false;
            playbackCurrentTime = 0;
            playAudio()
        }
    });
}

// settings

const settingsBtn = document.querySelector('.settings-btn');
const settings = document.querySelector('.settings');
settingsBtn.addEventListener('click', showSettings);
const languageSelector = document.querySelectorAll('.language-value')
languageSelector.forEach(lang => lang.addEventListener('click', changeLanguage));
const imageSelectorSrc = document.querySelectorAll('.image-src-value');
imageSelectorSrc.forEach(src => src.addEventListener('click', changeImgSrc))


function showSettings() {
    settings.classList.toggle('settings-active');
}

function changeLanguage() {
    if (this.classList.contains('en') && language === 'en') {
        return;
    }
    if (this.classList.contains('ru') && language === 'ru') {
        return;
    }
    this.classList.contains('en') ? language = 'en' : language = 'ru';
    name.placeholder = placeHolder[language];
    getWeather();
    getQuotes();
    showGreeting();
}

function changeImgSrc() {
    if (this.classList.contains('github') && bgSrc === 'github') {
        return;
    }
    if (this.classList.contains('unsplash') && bgSrc === 'unsplash') {
        return;
    }
    if (this.classList.contains('flickr') && bgSrc === 'flickr') {
        return;
    }
    this.classList.contains('github') ? bgSrc = 'github' :
    this.classList.contains('unsplash') ? bgSrc = 'unsplash' : bgSrc = 'flickr';
    setBg();
}

// Links

const linksBtn = document.querySelector('.links-btn');
const links = document.querySelector('.links');
linksBtn.addEventListener('click', showLinks);
const linkAdd = document.querySelector('.link-add');
linkAdd.addEventListener('click', showNewBookmark);
const linkInput = document.querySelector('.link-add-input');
let newBookmarkName = document.querySelector('.new-bookmark-name');
let newBookmarkSrc = document.querySelector('.new-bookmark-src');
const linksContent = document.querySelector('.links-content');
const newLinkBtn = document.querySelector('.add-new-link');
newLinkBtn.addEventListener('click', createBookmark);
newLinkBtn.addEventListener('click', toLocalStorageBookmark);


function showLinks() {
    links.classList.toggle('links-active');
}

function showNewBookmark() {
    linkInput.classList.toggle('link-add-input-active');
}

function createBookmark() {
    const newLi = document.createElement('li');
    newLi.classList.add('users-link');
    const newA = document.createElement('a');
    const trashBtn = document.createElement('i');
    trashBtn.classList.add('trash-btn');
    trashBtn.addEventListener('click', deleteBookmark);
    newA.href = `https://${newBookmarkSrc.value}`;
    newA.textContent = newBookmarkName.value;
    linksContent.append(newLi);
    newLi.append(newA);
    newLi.appendChild(trashBtn);
}

function toLocalStorageBookmark() {
    const newBookmark = JSON.parse(localStorage.getItem('bookmark')) || [];
    newBookmark.push({name: `${newBookmarkName.value}`, src: `${newBookmarkSrc.value}`});
    localStorage.setItem('bookmark', JSON.stringify(newBookmark));
    newBookmarkName.value = '';
    newBookmarkSrc.value = '';
    showNewBookmark()
}

function deleteBookmark() {
    if (confirm('Delete bookmark?')) {
        this.parentNode.remove();
        let storedBookmarks = JSON.parse(localStorage.getItem('bookmark'));
        for (let i = 0; i < storedBookmarks.length; i++) {
            let bookmarkName = storedBookmarks[i].name;
            if (bookmarkName === this.previousSibling.textContent) {
                storedBookmarks.splice([i], 1);
                localStorage.setItem('bookmark', JSON.stringify(storedBookmarks));
                return;
            }
        }
        
    }
}

function getBookmarks() {
    const loadBookmarks = JSON.parse(localStorage.getItem('bookmark')) || [];
    for (let i = 0; i < loadBookmarks.length; i++) {
        newBookmarkName.value = loadBookmarks[i].name;
        newBookmarkSrc.value = loadBookmarks[i].src;
        createBookmark()
    }
    newBookmarkName.value = '';
    newBookmarkSrc.value = '';
}

getBookmarks()


