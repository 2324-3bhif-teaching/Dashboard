var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
document.addEventListener('DOMContentLoaded', function () {
    init();
});
var stopwatchInterval;
var elapsedSeconds = 0;
var p1 = false;
var p2 = false;
var p3 = false;
var p4 = false;
function init() {
    document.getElementById('start-btn').addEventListener('click', function () {
        p1 = true;
        p2 = true;
        p3 = true;
        p4 = true;
        if (!stopwatchInterval) {
            stopwatchInterval = setTimeout(updateStopwatch, 1);
        }
    });
    document.getElementById('stop-btn').addEventListener('click', function () {
        stopTime();
    });
    document.getElementById('stop-p1-btn').addEventListener('click', function () {
        p1 = false;
    });
    document.getElementById('stop-p2-btn').addEventListener('click', function () {
        p2 = false;
    });
    document.getElementById('stop-p3-btn').addEventListener('click', function () {
        p3 = false;
    });
    document.getElementById('stop-p4-btn').addEventListener('click', function () {
        p4 = false;
    });
    document.getElementById('reset-btn').addEventListener('click', function () {
        stopTime();
        document.getElementById('current-time').textContent = '00:00.00';
        document.getElementById('p1-time').textContent = '00:00.00';
        document.getElementById('p2-time').textContent = '00:00.00';
        document.getElementById('p3-time').textContent = '00:00.00';
        document.getElementById('p4-time').textContent = '00:00.00';
    });
    setTimeout(updateConnectedDevices, 500);
}
function updateConnectedDevices() {
    var devicesCount = Math.floor(Math.random() * 100);
    document.getElementById('connected-devices').innerHTML = devicesCount.toString();
}
function updateStopwatch() {
    return __awaiter(this, void 0, void 0, function () {
        var minutes, seconds, milliseconds;
        return __generator(this, function (_a) {
            elapsedSeconds++;
            minutes = String(Math.floor(elapsedSeconds / 3600)).padStart(2, '0');
            seconds = String(Math.floor((elapsedSeconds % 3600) / 60)).padStart(2, '0');
            milliseconds = String(elapsedSeconds % 60).padStart(2, '0');
            if (!p1 && !p2 && !p3 && !p4) {
                stopTime();
                return [2 /*return*/];
            }
            document.getElementById('current-time').textContent = "".concat(minutes, ":").concat(seconds, ".").concat(milliseconds);
            if (p1) {
                document.getElementById('p1-time').textContent = "".concat(minutes, ":").concat(seconds, ".").concat(milliseconds);
            }
            if (p2) {
                document.getElementById('p2-time').textContent = "".concat(minutes, ":").concat(seconds, ".").concat(milliseconds);
            }
            if (p3) {
                document.getElementById('p3-time').textContent = "".concat(minutes, ":").concat(seconds, ".").concat(milliseconds);
            }
            if (p4) {
                document.getElementById('p4-time').textContent = "".concat(minutes, ":").concat(seconds, ".").concat(milliseconds);
            }
            // Call setTimeout again to schedule the next update
            stopwatchInterval = setTimeout(updateStopwatch, 1);
            return [2 /*return*/];
        });
    });
}
function stopTime() {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
    elapsedSeconds = 0;
}
