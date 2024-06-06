document.addEventListener('DOMContentLoaded', function () { init(); });
function init() {
    document.getElementById('start-btn').addEventListener('click', function () {
        if (!stopwatchInterval) {
            stopwatchInterval = setInterval(updateStopwatch, 1);
        }
    });
    document.getElementById('stop-btn').addEventListener('click', function () {
        clearInterval(stopwatchInterval);
        stopwatchInterval = null;
        elapsedSeconds = 0;
        document.getElementById('stopwatch').textContent = "00:00:00";
    });
}
var stopwatchInterval;
var elapsedSeconds = 0;
function updateStopwatch() {
    elapsedSeconds++;
    var minutes = String(Math.floor(elapsedSeconds / 3600)).padStart(2, '0');
    var seconds = String(Math.floor((elapsedSeconds % 3600) / 60)).padStart(2, '0');
    var milliseconds = String(elapsedSeconds % 60).padStart(2, '0');
    document.getElementById('stopwatch').textContent = "".concat(minutes, ":").concat(seconds, ".").concat(milliseconds);
}
