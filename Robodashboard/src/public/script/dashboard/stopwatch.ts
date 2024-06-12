document.addEventListener('DOMContentLoaded', () => {
    init();
});

let stopwatchInterval;
let elapsedSeconds = 0;

function init() {
    document.getElementById('start-btn').addEventListener('click', () => {
        if (!stopwatchInterval) {
            stopwatchInterval = setTimeout(updateStopwatch, 1);
        }
    });

    document.getElementById('stopwatch-main').addEventListener('click', () => {
        clearInterval(stopwatchInterval);
        stopwatchInterval = null;
        elapsedSeconds = 0;
        document.getElementById('stopwatch').textContent = "00:00:00";
    });

    setTimeout(updateConnectedDevices, 500);
}

function updateConnectedDevices() {
    const devicesCount = Math.floor(Math.random() * 100);
    document.getElementById('connected-devices').innerHTML = devicesCount.toString();
}

async function updateStopwatch() {
    elapsedSeconds++;
    const minutes = String(Math.floor(elapsedSeconds / 3600)).padStart(2, '0');
    const seconds = String(Math.floor((elapsedSeconds % 3600) / 60)).padStart(2, '0');
    const milliseconds = String(elapsedSeconds % 60).padStart(2, '0');
    document.getElementById('stopwatch').textContent = `${minutes}:${seconds}.${milliseconds}`;

    // Call setTimeout again to schedule the next update
    stopwatchInterval = setTimeout(updateStopwatch, 1);
}