let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;
let lapCount = 0;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapsList = document.getElementById('lapsList');


function formatTime(value) {
    return String(value).padStart(2, '0');
}

// Update the display
function updateDisplay() {
    const minutes = Math.floor(elapsedTime / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);

    minutesDisplay.textContent = formatTime(minutes);
    secondsDisplay.textContent = formatTime(seconds);
    millisecondsDisplay.textContent = formatTime(milliseconds);
}

// Start the stopwatch
function start() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
        isRunning = true;
        startBtn.disabled = true;
        stopBtn.disabled = false;
    }
}

// Stop the stopwatch
function stop() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        startBtn.disabled = false;
        stopBtn.disabled = true;
    }
}

// Reset the stopwatch
function reset() {
    clearInterval(timerInterval);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    lapCount = 0;
    updateDisplay();
    startBtn.disabled = false;
    stopBtn.disabled = true;
    lapsList.innerHTML = '';
}

// Record a lap
function recordLap() {
    if (isRunning) {
        lapCount++;
        const minutes = Math.floor(elapsedTime / 60000);
        const seconds = Math.floor((elapsedTime % 60000) / 1000);
        const milliseconds = Math.floor((elapsedTime % 1000) / 10);

        const lapTime = `${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(milliseconds)}`;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
        lapsList.appendChild(lapItem);

        // Scroll to the bottom
        lapsList.scrollTop = lapsList.scrollHeight;
    }
}

// Event listeners
startBtn.addEventListener('click', start);
stopBtn.addEventListener('click', stop);
resetBtn.addEventListener('click', reset);

// Optional: Add keyboard support
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        if (isRunning) {
            stop();
        } else {
            start();
        }
    }
    if (e.code === 'KeyR') {
        reset();
    }
    if (e.code === 'KeyL') {
        recordLap();
    }
});

// Initialize display
updateDisplay();
stopBtn.disabled = true;
