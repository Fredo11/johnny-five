// server.js
/////////////////////////////////////////////////////////
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

//////////////////////////////////////////////////////////

// variable du composant ldr
var ldr;
 
//A la connection d'Arduino
 var board = new five.Board();  
board.on("ready", function() {  
    console.log('Arduino connected');
    ldr = new five.Light( {
        pin : "A0", // branchement du capteur : A0.
        freq : 1000 // intervalle entre deux lectures
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
        
        /*
        //lecture automatique
        ldr.on("change",function(){
            console.log("Niveau de lumière : "+ this.level);
            socket.emit('ldr', { 
                light : this.level
            });
        });
        */
        
        //Message à envoyer
        ldr.within([ 0,500 ], function() {
            // niveau clair dans l'intervalle, alors ...
            console.log("Niveau clair : "+this.level);
            socket.emit('ldr:clair', { 
                light : this.level
            });
        });

        //Message à envoyer                
        ldr.within([ 500,700 ], function() {
            // niveau moyen dans l'intervalle, alors ...
            console.log("Niveau moyen : "+this.level);
            socket.emit('ldr:moyen', { 
                light : this.level
            });
        });

        //Message à envoyer
        ldr.within([ 700,1000 ], function() {
            // niveau sombre dans l'intervalle, alors ...
            console.log("Niveau sombre : "+this.level);
            socket.emit('ldr:sombre', { 
                light : this.level
            });
        });


    }


});

//Message d'attente 
console.log('Waiting for connection');
 
 