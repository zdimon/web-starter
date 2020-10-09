const app = require('express')();
var express = require('express');
var Rx = require('rx');
const server = require('http').createServer(app);
const options = {  };
const io = require('socket.io')(server, options);
app.use(express.static('.'));

// const stream = Rx.Observable.interval(1000)
// .subscribe((t) => {
//     console.log(t);
//     io.send({data: 'test'})
// })

var SPEED = 40;
var STAR_NUMBER = 225;
var CANVAS_SIZE = 300;
var StarStream = Rx.Observable.range(1, STAR_NUMBER)
.map(function() {
    return {
        x: parseInt(Math.random() * CANVAS_SIZE),
        y: parseInt(Math.random() * CANVAS_SIZE),
        size: Math.random() * 3 + 1
    }
})
.toArray()
.switchMap((starArray) => {
    return Rx.Observable.interval(SPEED).map(function() {
        starArray.forEach(function(star) {
            if (star.y >= CANVAS_SIZE) {
                star.y = 0; // Reset star to top of the screen
            }
            star.y += 3; // Move star
        });
        return starArray;
    });
});

// StarStream.subscribe((evt) => {
//     io.send({data: evt});
// })







server.listen(5000, () => {
    console.log('Listening 5000');
});