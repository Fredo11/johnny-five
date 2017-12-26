// server.js
//////////////////////////////////////////////////////
var express        = require('express');  
var app            = express();  
var httpServer = require("http").createServer(app);  
var five = require("johnny-five");  
var io=require('socket.io')(httpServer);
 
var port = 3000; 
 
app.use(express.static(__dirname));
 
app.get('/', function(req, res) {  
        res.sendFile(__dirname + '/index.html');
});
 
httpServer.listen(port);  
console.log('Server available at http://localhost:' + port);  

//////////////////////////////////////////////////////


var led;
 

 var board = new five.Board(); 

//A la comnnection d'Arduino 
board.on("ready", function() {  
    console.log('Arduino connected');
    led = new five.Led(2); // une led branchée sur D2
});


//A la déconnexion d'Arduino
board.on("exit", function() {  
    console.log('Arduino disconnected');
    led.off();
});
 
//Socket connection handler
io.on('connection', function (socket) {  
    socket.emit('news', { message: "Connection établie !" });
    console.log("socket : " + socket.id);
        
    //Allumage de la led
    socket.on('led:on', function (data) {
        led.on();
        console.log('LED ON RECEIVED');
    });
 
    //Éteignement de la led
    socket.on('led:off', function (data) {
        led.off();
        console.log('LED OFF RECEIVED');
 
    });
});

//Message d'attente 
console.log('Waiting for connection');
 
 