document.addEventListener('DOMContentLoaded', function () { init(); });
function init() {
    setInterval(updateConnectedDevices, 5000);
}
function updateConnectedDevices() {
    var devicesCount = Math.floor(Math.random() * 100);
    document.getElementById('connected-devices').textContent = String(devicesCount);
}