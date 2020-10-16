"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SocketServer_1 = require("./lib/SocketServer");
var express = require('express');
var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server, {});
var ws = new SocketServer_1.SocketServer(io);
app.use(express.static('.'));
// livereload  
var livereload = require("livereload");
var liveReloadServer = livereload.createServer();
liveReloadServer.watch(__dirname, '/../../src');
var connectLivereload = require("connect-livereload");
liveReloadServer.server.once("connection", function () {
    setTimeout(function () {
        liveReloadServer.refresh("/");
    }, 1000);
});
app.use(connectLivereload());
app.set('views', __dirname + '/../../src/server/tpl');
app.engine('html', require('swig').renderFile);
app.use("/", function (request, response) {
    response.render("index.html");
});
server.listen(5000, function () {
    console.log('Listening 5000 port');
});
