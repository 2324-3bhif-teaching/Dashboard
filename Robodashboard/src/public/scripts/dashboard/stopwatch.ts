async function fetchRestEndpoint(route: string, method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH", data?: object): Promise<any> {
    let options: any = { method };
    if (data) {
        options.headers = { "Content-Type": "application/json" };
        options.body = JSON.stringify(data);
    }
    const res = await fetch(route, options);
    if (!res.ok) {
        const error = new Error(`${method} ${res.url} ${res.status} (${res.statusText})`);
        throw error;
    }
    if (res.status !== 204) {
        return await res.json();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    init();
});

let stopwatchInterval: NodeJS.Timeout | null = null;
let elapsedSeconds = 0;

let p1 = false;
let p2 = false;
let p3 = false;
let p4 = false;

function init() {
    document.getElementById('start-btn')!.addEventListener('click', () => {
        p1 = true;
        p2 = true;
        p3 = true;
        p4 = true;
        if (!stopwatchInterval) {
            stopwatchInterval = setTimeout(updateStopwatch, 1000);
        }
    });

    document.getElementById('stop-btn')!.addEventListener('click', () => {
        stopTime();
    });

    document.getElementById('stop-p1-btn')!.addEventListener('click', () => {
        p1 = false;
    });

    document.getElementById('stop-p2-btn')!.addEventListener('click', () => {
        p2 = false;
    });

    document.getElementById('stop-p3-btn')!.addEventListener('click', () => {
        p3 = false;
    });

    document.getElementById('stop-p4-btn')!.addEventListener('click', () => {
        p4 = false;
    });

    document.getElementById('reset-btn')!.addEventListener('click', () => {
        stopTime();
        document.getElementById('current-time')!.textContent = '00:00.00';
        document.getElementById('p1-time')!.textContent = '00:00.00';
        document.getElementById('p2-time')!.textContent = '00:00.00';
        document.getElementById('p3-time')!.textContent = '00:00.00';
        document.getElementById('p4-time')!.textContent = '00:00.00';
    });

    setTimeout(updateConnectedDevices, 500);
}

function updateConnectedDevices() {
    const devicesCount = Math.floor(Math.random() * 100);
    document.getElementById('connected-devices')!.innerHTML = devicesCount.toString();
}

async function updateStopwatch() {
    elapsedSeconds++;
    const minutes = String(Math.floor(elapsedSeconds / 60)).padStart(2, '0');
    const seconds = String(elapsedSeconds % 60).padStart(2, '0');
    const milliseconds = '00'; // Modify as needed for more precise timing

    if (!p1 && !p2 && !p3 && !p4) {
        stopTime();
        return;
    }

    document.getElementById('current-time')!.textContent = `${minutes}:${seconds}.${milliseconds}`;

    if (p1) {
        document.getElementById('p1-time')!.textContent = `${minutes}:${seconds}.${milliseconds}`;
    }

    if (p2) {
        document.getElementById('p2-time')!.textContent = `${minutes}:${seconds}.${milliseconds}`;
    }

    if (p3) {
        document.getElementById('p3-time')!.textContent = `${minutes}:${seconds}.${milliseconds}`;
    }

    if (p4) {
        document.getElementById('p4-time')!.textContent = `${minutes}:${seconds}.${milliseconds}`;
    }

    // Call setTimeout again to schedule the next update
    stopwatchInterval = setTimeout(updateStopwatch, 1000);
}

async function stopTime() {
    clearTimeout(stopwatchInterval!);
    stopwatchInterval = null;

    // Gather the race times
    const currentTime = document.getElementById('current-time')!.textContent;
    const p1Time = document.getElementById('p1-time')!.textContent;
    const p2Time = document.getElementById('p2-time')!.textContent;
    const p3Time = document.getElementById('p3-time')!.textContent;
    const p4Time = document.getElementById('p4-time')!.textContent;

    // Send the race times to the server
    try {
        await fetchRestEndpoint('/api/race/updateDuration', 'POST', {
            currentTime,
            p1Time,
            p2Time,
            p3Time,
            p4Time
        });
    } catch (error) {
        console.error('Error updating race duration:', error);
    }

    elapsedSeconds = 0;
}
