// server.js
//////////////////////////////////////////////////////////
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

///////////////////////////////////////////////////////////////
var led;
 

var board = new five.Board();

//A la connection d'Arduino
board.on("ready", function() {  
    console.log('Arduino connected');
    led = new five.Led.RGB([5,6,9]); //branchement de la led : R(D5), G(D6), B(D9). PWM !!!!
    led.color("#00FF00"); // vert par défaut
    led.intensity(100);
});

//A la déconnexion d'Arduino
board.on("exit", function() {  
    console.log('Arduino disconnected');
    led.off();

});
 
 //Socket connection handler
io.on('connection', function (socket) {
    socket.emit('news', { message: "Connection établie !" });  
    console.log("Socket : "+ socket.id);
        
    //Allumage de la led
    socket.on('led:on', function (data) {
        led.on();
        console.log('LED ON RECEIVED');
    });
        
    //Eteignement de la led
    socket.on('led:off', function (data) {
        led.off();
        console.log('LED OFF RECEIVED');
    });

    //Réglage de la couleur de la led
    socket.on('led:color', function (data) {
        led.color(data.color);
        console.log('LED COLOR RECEIVED : '+ data.color);
    });
});

//Message d'attente 
console.log('Waiting for connection');
 
 