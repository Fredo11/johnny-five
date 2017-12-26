//Initialisation du socket
var socket = io.connect();

socket.on('news', function (data) {
	console.log(data.message);
});


//Variables des composants
var boutonOn=document.getElementById('boutonOn');
var boutonOff=document.getElementById('boutonOff');

//Configuration initiale des boutons
boutonOff.disabled=true;
boutonOn.focus();


//Évément du boutonOn
boutonOn.addEventListener('click',function(event){
	console.log('LED ON');
	socket.emit('led:on');
	boutonOn.disabled=true;
	boutonOff.disabled=false;
	boutonOff.focus();
	event.preventDefault(); //évite l'action par défaut.
	event.stopPropagation(); // stoppe la propagation de l'événement.
});


//Évément du boutonOff
boutonOff.addEventListener('click',function(event){
	console.log('LED OFF');
	socket.emit('led:off');
	boutonOff.disabled=true;
	boutonOn.disabled=false;
	boutonOn.focus();
	event.preventDefault(); //évite l'action par défaut.
	event.stopPropagation(); // stoppe la propagation de l'événement.
});