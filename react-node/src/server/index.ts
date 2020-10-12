
import { config } from './config';
import { SocketServer } from './includes/SocketServer';
var express = require('express');
const app = require('express')();
var reload = require('reload')
var path = require('path');
const server = require('http').createServer(app);

// adding socket listener
const io = require('socket.io')(server, {});
var socketServer = new SocketServer(io);
app.use(express.static('.'));
// templates
app.set('views', __dirname + '/../../src/server/tpl');
app.engine('html', require('swig').renderFile);
app.use("/", function(request, response){
    response.render("index.html");
});
// livereload  
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'dist'));
const connectLivereload = require("connect-livereload");
app.use(connectLivereload()); 


 


server.listen(config.serverPort, () => {
    io.send({message: 'Goooooo'});
    console.log(`Listening ${config.serverPort}`);
});
