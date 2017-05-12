// //load in all the things
// var app = require('express')();
// var server = require('http').Server(app);

// //hook into whiteboard.draw and console.log payload
//var socket = io.connect();

whiteboard.on('draw', (start,end,strokeColor) => {
    console.log('start',start,'end',end,'color',strokeColor);
    
});

var socket = io(window.location.origin);

socket.on('connect', function() {
    console.log('I have made a persistent two-way connection to the server!');

    socket.emit('sayHello', {msg : "shalom"})
});

socket.on()

