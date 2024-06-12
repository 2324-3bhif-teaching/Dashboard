document.addEventListener('DOMContentLoaded', () => { init(); });

function init() {
    let stopwatchMain = 0;
    let stopwatchPlayer1 = 0;
    let stopwatchPlayer2 = 0;
    let stopwatchPlayer3 = 0;
    let stopwatchPlayer4 = 0;

    document.getElementById('stopwatch-main').addEventListener('click', () => {
        stopwatchMain++;
    });

    document.getElementById('stopwatch-player-1').addEventListener('click', () => {
        stopwatchPlayer1++;
    });

    document.getElementById('stopwatch-player-2').addEventListener('click', () => {
        stopwatchPlayer2++;
    });

    document.getElementById('stopwatch-player-3').addEventListener('click', () => {
        stopwatchPlayer3++;
    });

    document.getElementById('stopwatch-player-4').addEventListener('click', () => {
        stopwatchPlayer4++;
    });
}