document.addEventListener('DOMContentLoaded', () => {
    init();
});

let stopwatchInterval;
let elapsedSeconds = 0;

let p1 = false;
let p2 = false;
let p3 = false;
let p4 = false;

function init() {
    document.getElementById('start-btn').addEventListener('click', () => {
        p1 = true;
        p2 = true;
        p3 = true;
        p4 = true;
        if (!stopwatchInterval) {
            stopwatchInterval = setTimeout(updateStopwatch, 1);
        }
    });

    document.getElementById('stop-btn').addEventListener('click', () => {
        stopTime();
    });

    document.getElementById('stop-p1-btn').addEventListener('click', () => {
        p1 = false;
    });

    document.getElementById('stop-p2-btn').addEventListener('click', () => {
        p2 = false;
    });

    document.getElementById('stop-p3-btn').addEventListener('click', () => {
        p3 = false;
    });

    document.getElementById('stop-p4-btn').addEventListener('click', () => {
        p4 = false;
    });

    document.getElementById('reset-btn').addEventListener('click', () => {
        stopTime();
        document.getElementById('current-time').textContent = '00:00.00';
        document.getElementById('p1-time').textContent = '00:00.00';
        document.getElementById('p2-time').textContent = '00:00.00';
        document.getElementById('p3-time').textContent = '00:00.00';
        document.getElementById('p4-time').textContent = '00:00.00';
    })

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

    if (!p1 && !p2 && !p3 && !p4) {
        stopTime();
        return;
    }

    document.getElementById('current-time').textContent = `${minutes}:${seconds}.${milliseconds}`;

    if (p1) {
        document.getElementById('p1-time').textContent = `${minutes}:${seconds}.${milliseconds}`;
    }

    if (p2) {
        document.getElementById('p2-time').textContent = `${minutes}:${seconds}.${milliseconds}`;
    }

    if (p3) {
        document.getElementById('p3-time').textContent = `${minutes}:${seconds}.${milliseconds}`;
    }

    if (p4) {
        document.getElementById('p4-time').textContent = `${minutes}:${seconds}.${milliseconds}`;
    }

    // Call setTimeout again to schedule the next update
    stopwatchInterval = setTimeout(updateStopwatch, 1);
}

function stopTime() {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
    elapsedSeconds = 0;
}