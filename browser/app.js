//create socket of browser that's connecting
var socket = io(window.location.origin); //info about your specific client (window)

//when the socket is connected, start doing everything else
socket.on('connect', function() {
    console.log("I am connected!");
});

//event listener - listen for when your whiteboard draws, and send it out to everyone else
whiteboard.on('draw', (start, end, strokeColor) => {
    socket.emit('aDraw', start, end, strokeColor);
});

//listen for other people drawing
socket.on('otherPersonDraw', function() {
    console.log('Another person drew!');
    //draw/render it on your screen
    whiteboard.draw(start, end, color); //DON'T put 'true' as shouldBroadcast arg -- will create an infinite loop

})


// Claire's and my beginnings of code (WRONG)
// whiteboard.on('draw', (start,end,strokeColor) => {
//     console.log('start',start,'end',end,'color',strokeColor);
//     socket.emit('drawn',{'start':start})
// });

// socket.on('connect', function() {
//     console.log('I have made a persistent two-way connection to the server!');

//     socket.emit('sayHello', {msg : "shalom"})

// });

// socket.on()

/*
could have done better: explaining diff between SOCKET event emitters and OTHER event emitters.
I was confused b/c from the getgo I thought we were using sockets to communicate for ALL event emitters / between front-end and back-end, etc.
It took claire and I a while to even get started because we were so lost on what sockets even were, what exactly they were connecting, etc.

Could explain that our front-end code is actually like the person VISITING the site, while our back-end code is the person SENDING the info? Is that even right?
I was so confused on who I was, and what role I was supposed to be playing with any given code, what it was connecting to, etc.

*/

