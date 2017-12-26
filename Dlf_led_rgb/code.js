// initialisation du socket
var socket = io.connect();

socket.on('news', function (data) {
	console.log(data.message);
});


// Les variables des composants
var boutonOn=document.getElementById('boutonOn');
var boutonOff=document.getElementById('boutonOff');
var inputCouleur=document.getElementById('inputCouleur');
var selectCouleur=document.getElementById('selectCouleur');

// désactiver le boutonOn au départ
boutonOn.disabled=true;


//Tableau des couleurs du sélecteur de couleurs.
var tabSelectCouleurs=[];
tabSelectCouleurs=[
["Sélectionner une couleur",'#000000'],
["Rouge","#FF0000"],
["Vert","#00FF00"],
["Bleu","#0000FF"],
["Turquoise","#40E0D0"]
];


//Ajout dynamique des options du sélecteur de couleurs.
for(var k = 0, length = tabSelectCouleurs.length; k < length; k++){
	var myOption = document.createElement("option");
	myOption.text = tabSelectCouleurs[k][0];
	myOption.value = tabSelectCouleurs[k][0];
	selectCouleur.add(myOption);
}


//Évément du boutonOn
boutonOn.addEventListener('click',function(event){
	console.log('LED ON');
	socket.emit('led:on');
	boutonOn.disabled=true;
	boutonOff.disabled=false;
	inputCouleur.disabled=false;
	selectCouleur.disabled=false;
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
	inputCouleur.disabled=true;
	selectCouleur.disabled=true;
	boutonOn.focus();
	event.preventDefault(); //évite l'action par défaut.
	event.stopPropagation(); // stoppe la propagation de l'événement.
});


//Évément du inputCouleur
inputCouleur.addEventListener('change',function(event){
	console.log('LED Color : ' +this.value);
	socket.emit('led:color',{color : this.value});
	selectCouleur.options[0].selected=true;
	event.preventDefault(); //évite l'action par défaut.
	event.stopPropagation(); // stoppe la propagation de l'événement.
});


//Évément du selectCouleur
selectCouleur.addEventListener('change',function(event){
	var i;
	i=this.selectedIndex;
	var couleurChoisie=tabSelectCouleurs[i][1];
	inputCouleur.value=couleurChoisie;
	console.log('LED Selected Color: ' + this.options[i].innerHTML);
	socket.emit('led:color',{color : couleurChoisie});
	event.preventDefault(); //évite l'action par défaut.
	event.stopPropagation(); // stoppe la propagation de l'événement.
});