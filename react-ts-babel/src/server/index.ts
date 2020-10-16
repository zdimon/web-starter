import { SocketServer } from './lib/SocketServer';

var express = require('express');
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {});
const ws = new SocketServer(io);

const compression = require('compression');
app.use(compression())

app.use(express.static('.'));


// livereload  
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(__dirname, '/../../src');      
const connectLivereload = require("connect-livereload");

liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 1000);
  }); 

app.use(connectLivereload());

app.set('views', __dirname + '/../../src/server/tpl');
app.engine('html', require('swig').renderFile);
app.use("/", function(request, response){
    response.render("index.html");  
});





server.listen(5000, () => {
    console.log('Listening 5000 port' )
});