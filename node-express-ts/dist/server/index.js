var express = require('express');
var app = require('express')();
var server = require('http').createServer(app);
// static files 
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
///////////////////////
// templates
app.set('views', __dirname + '/../../src/server/tpl');
app.engine('html', require('swig').renderFile);
/////
// index page
app.use("/", function (request, response) {
    response.render("index.html");
});
// event loop
server.listen(5000, function () {
    console.log('Listening 5000 port.');
});
