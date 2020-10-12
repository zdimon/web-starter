var express = require('express');
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {});
const myapp = require('./app/main');
myapp.init(io);
// console.log(myapp);
app.use(express.static('.'));

app.get('/test', (req, res) => {
    res.send('Hello World!')
})




server.listen(5000, () => {
    console.log('Listening 5000');
});