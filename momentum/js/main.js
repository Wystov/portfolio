const time = document.querySelector('.time');
const date = document.querySelector('date');
const dateOptions = {weekday: 'long', day: 'numeric', month: 'long'};
let newDate = new Date();
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
name.addEventListener('blur', setLocalStorage);
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
        return 'Night';
    } else if (hours >= 6 && hours <= 1) {
        return 'Morning';
    } else if (hours >= 12 && hours <= 17) {
        return 'Afternoon ';
    } else {
        return 'Evening';
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
}

function getLocalStorage() {
    if (localStorage.getItem('name')) {
      name.value = localStorage.getItem('name');
      name.blur();
    }
}

function nameBlur (key) {
    if (key.keyCode === 13) {
      name.blur();
    }
}

// 3. picture slider








