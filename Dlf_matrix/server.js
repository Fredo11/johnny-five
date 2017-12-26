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

////////////////////////////////////////////////////////////
var matrice;
 

var board = new five.Board();  

//Lors de la connection d'Arduino
board.on("ready", function() {  
    console.log('Arduino connected');
    //Création du composant Led.Matrix
    matrice = new five.Led.Matrix({
        pins: {
            data: 2,
            clock: 3,
            cs: 4
        }
    });
});

//Lors de la déconnection d'Arduino
board.on("exit", function() {  
    console.log('Arduino disconnected');
    //On étaint la matrice
    matrice.off()
});

// Fonction permettant un affichage plus long de chaque lettre
function afficherSymbole(c){
    matrice.draw(c);
    matrice.draw(c);
    matrice.draw(" ");
    matrice.draw(" ");
}



 
//Socket connection handler
io.on('connection', function (socket) { 
    socket.emit('news', { message: "Connection établie !" }); 
    console.log("socket : " + socket.id);

    //Lorsqu'on reçoint une chaine à afficher
    socket.on('matrix:string', function (data) {
        console.log('Matrix : string');
        var chaine = data.chaine;
        if (chaine) {
            for (var i = 0; i < chaine.length; i++) {

                afficherSymbole(chaine[i]);
            }    
        }
    });
    
});

//Message d'attente 
console.log('Waiting for connection');
 
 