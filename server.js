/*
1) How does the app know whether to use a typical HTTP request, or whether it needs to go to the socket?
2) "io global"??? making it available everywhere? how did everything become available everywhere?
3) Why did he have to BROADCAST the drawing when he got it, to render it on his screen? What does that mean?
I thought it would be like 'render it on the screen'

**4) I'm left rly confused about difference between server.js and app.js (front-end) at this point, in this workshop, and the relationship between those, vs the relationship between drawer and receiver.
*/

var path = require('path');
var express = require('express');
var app = express(); // the app returned by express() is a JavaScript Function. Not something we can pass to our sockets!

// app.listen() returns an http.Server object
// http://expressjs.com/en/4x/api.html#app.listen
var server = app.listen(1337, function () {
    console.log('The server is listening on port 1337!');
});

var socketio = require('socket.io');

//takes our server and wraps it all in the io logic. so now, "io" is a socketserver (and an event emitter)
//also, allows us to get client code of the socket automatically
var io = socketio(server);

//use socket server as an event emitter to listen for new connections
io.on('connection', function(socket) {
    //receives newly connected socket, and will be called for EACH browser that connects to our server.
    console.log('A new client has connected!');
    console.log(socket.id);

    //when you get a drawing from another client, display it
    socket.on('aDraw', (start, end, color) => {
        //display/render the drawing - broadcast it to all the other connected sockets EXCEPT the drawer himself
        socket.broadcast.emit('otherPersonDraw', start, end, color); 
        //note: use 'socket.broadcast.emit'; if we had done "io.sockets.emit", it would've gone out to everyone INCLUDING the drawer...
    })
    
    //listen for anytime anyone disconnects
    socket.on('disconnect', function() {
        console.log(": ( disconnected");
    });
    
});

//static middleware to serve up all the JS in 'browser' folder
app.use(express.static(path.join(__dirname, 'browser')));

//static middleware to serve up index.html
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});