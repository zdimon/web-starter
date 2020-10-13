"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reloader = void 0;
var Reloader = /** @class */ (function () {
    function Reloader(io) {
        this.io = io;
        this.io.on('connection', function (socket) {
            console.log('connected!');
        });
    }
    return Reloader;
}());
exports.Reloader = Reloader;
