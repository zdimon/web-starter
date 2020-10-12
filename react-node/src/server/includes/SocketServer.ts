export class SocketServer {
    constructor(io: any) {
        io.on('connection', socket => { 
            console.log('Connected');
            console.log(socket.id);
            io.send({message: 'Goooooo'}); 
         });
          
    }
}