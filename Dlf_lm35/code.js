//Initialisation du socket
var socket = io.connect();

socket.on('news', function (data) {
	console.log(data);
});


//Variables des composants
var tempCelsius=document.getElementById('tempCelsius');
var tempFarenheit=document.getElementById('tempFarenheit');
var tempKelvin=document.getElementById('tempKelvin');


socket.on('lm35', function (data) {
    console.log("Température en Celsius:",data.celsius);
    tempCelsius.innerHTML=data.celsius+" ºC";
    tempFarenheit.innerHTML=data.farenheit+" ºF";
    tempKelvin.innerHTML=data.kelvin+" ºK";
});

