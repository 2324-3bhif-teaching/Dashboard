document.addEventListener('DOMContentLoaded', function () { init(); });
function init() {
    setTimeout(updateConnectedDevices, 500);
}
function updateConnectedDevices() {
    const devicesCount = Math.floor(Math.random() * 100);
    document.getElementById('connected-devices').innerHTML = devicesCount.toString();
}