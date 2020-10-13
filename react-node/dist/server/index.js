"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config");
var SocketServer_1 = require("./includes/SocketServer");
var express = require('express');
var app = require('express')();
var reload = require('reload');
var path = require('path');
var server = require('http').createServer(app);
app.use(express.static('.'));
// livereload  
var livereload = require("livereload");
var liveReloadServer = livereload.createServer();
liveReloadServer.watch(__dirname, '/../../src');
liveReloadServer.server.once("connection", function () {
    setTimeout(function () {
        liveReloadServer.refresh("/");
    }, 500);
});
var connectLivereload = require("connect-livereload");
app.use(connectLivereload());
// adding socket listener
var io = require('socket.io')(server, {});
var socketServer = new SocketServer_1.SocketServer(io);
// templates
app.set('views', __dirname + '/../../src/server/tpl');
app.engine('html', require('swig').renderFile);
app.use("/", function (request, response) {
    response.render("index.html");
});
server.listen(config_1.config.serverPort, function () {
    io.send({ message: 'Goooooo' });
    console.log("Listening " + config_1.config.serverPort);
});
