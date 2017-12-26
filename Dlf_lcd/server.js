// server.js
/////////////////////////////////////////////////////
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
var lcd;
 

var board = new five.Board();  

//A la connection d'Arduino
board.on("ready", function() {  
    console.log('Arduino connected');
    lcd = new five.LCD({
    // LCD pin name  RS  EN  DB4 DB5 DB6 DB7
    // Arduino pin # 7    8   9   10  11  12
    pins: [7, 8, 9, 10, 11, 12],
    backlight: 6,
    rows: 4,  // nombre de lignes de l'écran
    cols: 20  // nombre de colonnes de l'écran

    // Options:
    // bitMode: 4 or 8, defaults to 4
    // lines: number of lines, defaults to 2
    // dots: matrix dimensions, defaults to "5x8"
    });

});

//A la déconnexion d'Arduino
board.on("exit", function() {  
    console.log('Arduino disconnected');
    lcd.clear();

});


 
//Socket connection handler
io.on('connection', function (socket) {  
    console.log("socket : " + socket.id);

    //Demande d'affichage d'un message
    socket.on('lcd:string', function (data) {
        console.log('lcd : string');
        var chaine = data.chaine;

        lcd.clear().cursor(0, 0).print(chaine);

        /*
        board.wait(3000, function() {
            lcd.clear();
        });
        */
    });

    //Demande d'effacer l'écran
    socket.on('lcd:clear', function (data) {
        console.log('lcd : clear');

        lcd.clear();
    });
    
});

//Message d'attente 
console.log('Waiting for connection');
 
 