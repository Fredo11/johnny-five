//Initialisation du socket
var socket = io.connect();

socket.on('news', function (data) {
	console.log(data.message);
});


//Variables des composants
var boutonSubmit=document.getElementById('boutonSubmit');
var inputTexte=document.getElementById('inputTexte');
var boutonEffacer=document.getElementById('boutonEffacer');


//Évément du boutonSubmit
boutonSubmit.addEventListener('click',function(event){
	console.log("Afficher : "+inputTexte.value);
	socket.emit('lcd:string',{
		chaine : inputTexte.value
	});
	event.preventDefault(); //évite l'action par défaut.
	event.stopPropagation(); // stoppe la propagation de l'événement.
});

//Évément du boutonEffacer
boutonEffacer.addEventListener('click',function(event){
	console.log("Effacer l'écran.");
	socket.emit('lcd:clear');
	event.preventDefault(); //évite l'action par défaut.
	event.stopPropagation(); // stoppe la propagation de l'événement.
});

