const time = document.querySelector('.time');
const date = document.querySelector('date');
const dateOptions = {weekday: 'long', day: 'numeric', month: 'long'};

function showTime() {
    const newDate = new Date();
    const currentTime = newDate.toLocaleTimeString();
    time.textContent = currentTime;
    showDate()
    setTimeout(showTime, 1000);
}

function showDate() {
    const newDate = new Date();
    const currentDate = newDate.toLocaleDateString('ru-RU', dateOptions);
    date.textContent = currentDate;
}

showTime()
