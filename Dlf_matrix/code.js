//Initialisation du socket
var socket = io.connect();

socket.on('news', function (data) {
	console.log(data);
});


//Variables des composants
var boutonSubmit=document.getElementById('boutonSubmit');
var inputTexte=document.getElementById('inputTexte');


//Évément du boutonOn
boutonSubmit.addEventListener('click',function(event){
	console.log("Afficher : "+inputTexte.value);
	socket.emit('matrix:string',{
		chaine : inputTexte.value
	});
	event.preventDefault(); //évite l'action par défaut.
	event.stopPropagation(); // stoppe la propagation de l'événement.
});



