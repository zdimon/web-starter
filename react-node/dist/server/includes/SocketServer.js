"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketServer = void 0;
var SocketServer = /** @class */ (function () {
    function SocketServer(io) {
        io.on('connection', function (socket) {
            console.log('Connected');
            console.log(socket.id);
            io.send({ message: '88888888' });
        });
    }
    return SocketServer;
}());
exports.SocketServer = SocketServer;
