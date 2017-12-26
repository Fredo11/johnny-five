//Initialisation du socket
var socket = io.connect();

socket.on('news', function (data) {
	console.log(data.message);
});


//Variables des composants
var niveauLumiere=document.getElementById('niveauLumiere');


//Evénement : niveau clair
socket.on('ldr:clair', function (data) {
    console.log("Niveau clair de lumière :" + data.light);
    niveauLumiere.innerHTML=data.light;
    niveauLumiere.style.backgroundColor = "yellow";

});


//Evénement : niveau moyen
socket.on('ldr:moyen', function (data) {
    console.log("Niveau moyen de lumière:" + data.light);
    niveauLumiere.innerHTML=data.light;
    niveauLumiere.style.backgroundColor = "white";

});


//Evénement : niveau sombre
socket.on('ldr:sombre', function (data) {
    console.log("Niveau sombre de lumière:" + data.light);
    niveauLumiere.innerHTML=data.light;
	niveauLumiere.style.backgroundColor = "grey";
});



