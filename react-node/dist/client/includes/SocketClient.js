"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketConnection = void 0;
var io = require("socket.io");
var SocketConnection = /** @class */ (function () {
    function SocketConnection(url) {
        console.log('sockeio');
        this.connection = io(url, { transports: ['websocket'] });
        this.connection.on('connect', function (socket) {
            console.log(socket);
        });
        this.connection.on('message', function (mes) {
            console.log(mes);
        });
    }
    return SocketConnection;
}());
exports.SocketConnection = SocketConnection;
