var Rx = require('rx');
app = {
        blocks: [],
        tanks: []
      }

app.init = function(io) {
    this.io = io;
    this.createMap();
    this.ping();
    io.on('connection', socket => { 
        console.log(`Connected ${socket.id}`);
        
        this.createTank(socket.id);
        console.log(this.tanks);
        socket.on('message', data => {
            if(data.data === 'refresh') {
                this.createMap();
                console.log('refreshing');
            }
            if(data.data === 'move_left') {
                try { 
                    let tank = this.findTank(socket.id);
                    tank.x = tank.x - 3;
                } catch {
                    console.log(this.tanks);
                    console.log(socket.id);
                }
            }
            if(data.data === 'move_right') {
                try { 
                    let tank = this.findTank(socket.id);
                    tank.x = tank.x + 3;
                } catch {
                    console.log(this.tanks);
                    console.log(socket.id);
                }
            }

            if(data.data === 'move_forward') {

                    let tank = this.findTank(socket.id);
                    tank.y = tank.y - 3;

            }
            if(data.data === 'move_back') {
                    let tank = this.findTank(socket.id);
                    tank.y = tank.y + 3;
            }

        });

        socket.on('disconnect', () => { 
            console.log(`disconnection ${socket.id}`);
            this.deleteTank(socket.id);
            console.log(this.tanks);
        })

        
     });



}

app.createTank = function(sid){
    let t = {
        x: parseInt(Math.random() * 300),
        y: parseInt(Math.random() * 300),
        sid: sid
    }
    this.tanks.push(t);
}

app.deleteTank = function(sid){
    for(let t in this.tanks){
        if(this.tanks[t].sid === sid){
            this.tanks = this.tanks.splice(t-1,1);
        }
    }
}

app.findTank = function(sid){
    
    for(let t in this.tanks){
        
        if(this.tanks[t].sid === sid){
            return this.tanks[t];
        }
    }
}


app.createMap = function(){
    this.blocks = [];
    for(let i of [1,2,3,4,5,6,7]) {
        let b = {
            x: parseInt(Math.random() * 300),
            y: parseInt(Math.random() * 300),
            size: 10
        }
        app.blocks.push(b);
    }
}

app.ping = function() {
    Rx.Observable.interval(100).subscribe((evt) => {
        let data = {
            blocks: this.blocks,
            tanks: this.tanks
        }
        this.io.send(data);
    })
}

module.exports = app;