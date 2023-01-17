const time = document.querySelector('.time');
const date = document.querySelector('date');
const dateOptions = {weekday: 'long', day: 'numeric', month: 'long'};
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
name.addEventListener('blur', setLocalStorage);
name.addEventListener("keydown", keyDown);
window.addEventListener('load', getLocalStorage);



function showTime() {
    const newDate = new Date();
    const currentTime = newDate.toLocaleTimeString();
    time.textContent = currentTime;
    const hours = newDate.getHours();
    
    showDate()
    showGreeting()
 
    setTimeout(showTime, 1000);
}

function showDate() {
    const newDate = new Date();
    const currentDate = newDate.toLocaleDateString('ru-RU', dateOptions);
    date.textContent = currentDate;
}

function getTimeOfDay() {
    const newDate = new Date();
    const currentTime = newDate.toLocaleTimeString();
    if (currentTime >= 0 && currentTime <= 3) {
        return 'Night';
    } else if (currentTime >= 4 && currentTime <= 11) {
        return 'Morning';
    } else if (currentTime >= 12 && currentTime <= 17) {
        return 'Day';
    } else {
        return 'Evening';
    }
}

function showGreeting() {
    const timeOfDay = getTimeOfDay();
    const greetingText = `Good ${timeOfDay},`;
    greeting.textContent = greetingText;
}

function setLocalStorage() {
    localStorage.setItem('name', name.value);
}

function getLocalStorage() {
    if(localStorage.getItem('name')) {
      name.value = localStorage.getItem('name');
      name.blur();
    }
}

function keyDown (key) {
    if (key.keyCode === 13) {
      name.blur();
    }
}

showTime()




