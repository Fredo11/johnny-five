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

///////////////////////////////////////////////////////

var lm35;
 

var board = new five.Board(); 

//A la connection d'Arduino
board.on("ready", function() {  
    console.log('Arduino connected');
    lm35=new five.Thermometer({ //LM35 branché sur A0
        controller: "LM35",
        pin: "A0",
        freq : 5000
    });
});

//A la déconnexion d'Arduino
board.on("exit", function() {  
    console.log('Arduino disconnected');

});

 
//Socket connection handler
io.on('connection', function (socket) {
    socket.emit('news', { message: "Connection établie !" });  
    console.log("socket : " + socket.id);

    //Si la plaque est connectée
    if(board.isReady){
        //Envoi d'un message
        lm35.on("data",function(){
            socket.emit('lm35', { 
                celsius: this.C,
                farenheit: this.F,
                kelvin : this.K 
                });
            });
    }


});

//Message d'attente 
console.log('Waiting for connection');
 
 