let startTime = 0;
let updatedTime = 0;
let difference = 0;
let timerInterval;
let running = false;
let lapTimes = [];

const display = document.getElementById('display');
const startPauseButton = document.getElementById('startPauseButton');
const resetButton = document.getElementById('resetButton');
const lapButton = document.getElementById('lapButton');
const lapsList = document.getElementById('laps');

function startPause() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        timerInterval = setInterval(updateTime, 10);
        startPauseButton.textContent = 'Pause';
        running = true;
    } else {
        clearInterval(timerInterval);
        difference = new Date().getTime() - startTime;
        startPauseButton.textContent = 'Start';
        running = false;
    }
}

function reset() {
    clearInterval(timerInterval);
    startTime = 0;
    updatedTime = 0;
    difference = 0;
    running = false;
    lapTimes = [];
    display.textContent = '00:00:00:00';
    startPauseButton.textContent = 'Start';
    lapsList.innerHTML = '';
}

function lap() {
    if (running) {
        const lapTime = new Date().getTime() - startTime;
        lapTimes.push(lapTime);
        const lapElement = document.createElement('li');
        lapElement.textContent = formatTime(lapTime);
        lapsList.appendChild(lapElement);
    }
}

function updateTime() {
    updatedTime = new Date().getTime() - startTime;
    display.textContent = formatTime(updatedTime);
}

function formatTime(time) {
    const milliseconds = ('00' + (time % 1000)).slice(-2);
    const seconds = ('0' + (Math.floor(time / 1000) % 60)).slice(-2);
    const minutes = ('0' + (Math.floor(time / 60000) % 60)).slice(-2);
    const hours = ('0' + Math.floor(time / 3600000)).slice(-2);
    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

startPauseButton.addEventListener('click', startPause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);
