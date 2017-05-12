/*
1) How does the app know whether to use a typical HTTP request, or whether it needs to go to the socket?

*/

var path = require('path');
var express = require('express');
var app = express(); // the app returned by express() is a JavaScript Function. Not something we can pass to our sockets!
var socketio = require('socket.io');

// app.listen() returns an http.Server object
// http://expressjs.com/en/4x/api.html#app.listen
var server = app.listen(1337, function () {
    console.log('The server is listening on port 1337!');
});

var io = socketio(server);

//use socket serve as an event emitter to listen for new connections
io.on('connection', function(socket) {
    //receives newly connected socket, and will be called for EACH browser that connects to our server.
    console.log('A new client has connected!');
    console.log(socket.id);

    socket.on('sayHello', function(msg) {
        console.log('terminal ', msg)
    })
    
    socket.on('disconnect', function() {
        console.log(": ( disconnected");
    });

    
})


//static middleware to serve up all the JS in 'browser' folder
app.use(express.static(path.join(__dirname, 'browser')));

//static middleware to serve up index.html
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});
