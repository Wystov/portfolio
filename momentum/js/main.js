const time = document.querySelector('.time');
const date = document.querySelector('date');
const dateOptions = {weekday: 'long', day: 'numeric', month: 'long'};
let newDate = new Date();
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
name.addEventListener("keydown", nameBlur);
window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);

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
    const currentDate = newDate.toLocaleDateString('ru-RU', dateOptions);
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
    const greetingText = `Good ${timeOfDay},`;
    greeting.textContent = greetingText;
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

function setBg() {
    const timeOfDay = getTimeOfDay();
    const bgNum = randomNum.toString().padStart(2, '0');
    const bgLink = `https://raw.githubusercontent.com/Wystov/momentum-img/main/img/${timeOfDay}/${bgNum}.webp`;
    const img = new Image();
    img.src = bgLink;
    img.onload = () => {      
        document.body.style.backgroundImage = `url(${bgLink})`;
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

const defaultValue = 'Minsk';
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
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${storedValue}&lang=en&appid=8bfa64d27e5adae6d9aa62bd0fc92a2c&units=metric`;
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
    wind.textContent = `Wind: ${Math.round(data.wind.speed)} m/s`;
    humidity.textContent = `Humidity: ${Math.round(data.main.humidity)}%`;
}

getWeather()
