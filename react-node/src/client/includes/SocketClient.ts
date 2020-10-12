import { Client } from 'socket.io';
import * as io from 'socket.io';
export class SocketConnection {
    connection: any; 
    constructor(url: string) {
        console.log('sockeio');
        this.connection = io(url, {transports:['websocket']});
        this.connection.on('connect', socket => {
            console.log(socket);
        });
        this.connection.on('message', (mes) => {
            console.log(mes);
        });

        
    }
}

