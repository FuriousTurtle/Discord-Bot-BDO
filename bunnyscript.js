/*------------------------------------------------TABLEAU DE DONNÉES------------------------------------------------*/

//	Tab pour les améliorations
let amelio = ['+7', '+8', '+9', '+10', '+11', '+12', '+13', '+14', '+15', 'PRI', 'DUO', 'TRI', 'TET'];
let coeffAmelio = ['20', '17.5', '15', '12.5', '10', '7.5', '5', '2.5', '15', '7.5', '5', '2', '1.5'];
let pourcentages = ['2.5', '2', '1.5', '1.25', '0.75', '0.63', '0.5', '0.5', '1.5', '0.75', '0.5', '0.25', '0.25'];

//	Tab pour les boss
let daysTab = ['1', '2', '3', '4', '5', '6', '7'];
let bossNameTab = ['Kzarka', 'Karanda', 'Kutum', 'Nouver', 'Offin', 'Garmoth', 'Quint', 'Muraka', 'Vell'];

//	String sur les chances maximums d'évènement (s'envoie dans le canal écrit avec une commande)
let failtab = 
`Maximum de failstack par niveau d'arme
+7 à +8 : 13 failstacks (52.5%)
+8 à +9 : 14 failstacks (45.5%)
+9 à +10 : 15 failstacks (37.5%)
+10 à +11 : 16 failstacks (32.5%)
+11 à +12 : 18 failstacks (23.5%)
+12 à +13 : 20 failstacks (20%)
+13 à +14 : 25 failstacks (17.5%)
+14 à +15 : 25 failstacks (15%)
+15 à PRI : 25 failstacks (52.5%)
PRI à DUO : 35 failstacks (33.75%)
DUO à TRI : 44 failstacks (27%)
TRI à TET : 90 failstacks (25%)
TET à PEN : 124 failstacks (20.1%)`

/*------------------------------------------------TABLEAU HORAIRES BOSS------------------------------------------------*/

let kzarkaTab = {
	1 : ['00,15', '04,60', '08,60', '22,15'],
	2 : ['04,60'],
	3 : ['04,60', '15,60', '22,15'],
	5 : ['00,15', '18,60', '22,15'],
	6 : ['18,60'],
	7 : ['01,60', '11,60']
}

let karandaTab = {
	1 : ['01,60'],
	2 : ['00,15', '18,60'],
	3 : ['01,60', '08,60', '22,15'],
	5 : ['00,15', '04,60', '11,60'],
	6 : ['00,15', '18,60'],
	7 : ['18,60']
}

let kutumTab = {
	1 : ['00,15', '15,60'],
	2 : ['01,60', '08,60'],
	3 : ['00,15', '18,60'],
	4 : ['01,60', '08,60', '15,60'],
	5 : ['08,60', '22,15'],
	6 : ['08,60'],
	7 : ['00,15', '04,60']
}

let nouverTab = {
	1 : ['11,60', '18,60'],
	2 : ['15,60', '22,15'],
	4 : ['00,15', '04,60', '11,60'],
	5 : ['01,60', '15,60'],
	6 : ['04,60', '11,60'],
	7 : ['00,15', '08,60', '22,15']
}

let offinTab = {
	2 : ['11,60'],
	4 : ['18,60'],
	6 : ['01,60']
}

let garmothTab = {
	2 : ['22,15'],
	4 : ['22,15'],
	7 : ['22,15']
}

let quintTab = {
	6 : ['15,60']
}

let murakaTab = {
	6 : ['15,60']
}

let vellTab = {
	7 : ['15,60']
}

//	Tableau contenant les tableau d'horaires des boss
let bossArrayTab = [kzarkaTab, karandaTab, kutumTab, nouverTab, offinTab, garmothTab, quintTab, murakaTab, vellTab];

/*------------------------------------------------CODE DU SCRIPT------------------------------------------------*/

//	Initialisation du bot en utilisant le package npm discord.js
const Discord = require('discord.js');
const bot = new Discord.Client();
global.window = global;
let commandCase = [];
let channel;

//	Utilisation de la clé discord pour connecter le bot
var keyRaw = require('./key.js');
var keyString = keyRaw.key;
bot.login(keyString);

//	Initialisation des variables pour récupérer l'horloge système
let day = 1;
let hours;
let mins;
let today;

//	Lance la boucle principale loop lorsque le bot est totalement initialisé et connecté
bot.on('ready', () => {
	console.log('Bot ON');
	bot.user.setActivity("Pour l'aide : !bunny help");
	loop();
});

/*	Met à jour l'horloge système et lance la fonction calcDay à chaque mise
	à jour avec des paramètres différents pour chaque boss du jeu */
function refreshDate(){
	today = new Date();
	day = today.getDay();
	hours = today.getHours();
	mins = today.getMinutes();
	for(p = 0; p < daysTab.length; p++){
		for (q = 0; q < bossArrayTab.length; q++){
			calcDay(p, bossArrayTab[q], bossNameTab[q]);
		}
	}
}

/*	Appelée par la fonction refreshDate & lance une fonction de comparaison pour chaque jour
	de la semaine */
function calcDay(nbd, tab1, boss){
	if (day == nbd){
		global.tab2 = (String(tab1[nbd])).split(',');
		for(k = 0, l = 1 ; l < tab2.length ; k += 2, l +=2) {
			calcSpawn(k, l, tab2, boss); 
		}
	}
}

/*	Compare l'heure actuelle puis la minute actuelle avec celles des données d'horloge récupérées
	par la fonction refreshDate pour vérifier si un horaire de boss correspond avec l'horaire actuel
	(15 minutes de décalages pour pouvoir prévenir en avance) */
function calcSpawn(nb1, nb2, tab2, boss) {
	if (hours == tab2[nb1] && (mins == tab2[nb2] - 15 || tab2[nb2] == 15 && mins == 0)) {
		channel.send(`${boss} va spawn dans 15 minutes !`); 
	}
}

/*	Calcule le pourcentage de chance qu'un évènement se produise en partant d'un tableau de coefficient  
	propre à chaque situation */
function calcStats(message, nbi){ 
	if (commandCase[3] == amelio[nbi]) { 
		chancetotal = parseInt(coeffAmelio[nbi]) + (pourcentages[nbi] * commandCase[2]);
		message.reply(`les chances d'upgrade un item ${commandCase[3]} avec ${commandCase[2]} failstacks sont de ${chancetotal}%`); 
	} 
} 

/*	Lance la fonction refreshDate toutes les 60 secondes pour mettre à jours les données horaires
	à chaque changement de minute */
setInterval(refreshDate, 60000);

//	Loop principal du script
function loop(){

	//	Fonction appelée à chaque message posté dans le serveur ou le bot est connecté
	bot.on('message', function (message) {

		/*	Déstructure chaque message dans un tableau qui permettra ensuite de vérifier l'ordre
			et l'orthographe des mots et ainsi de réagir si le message est destiné au bot */
		let commande = message.content;
		commandCase = commande.split(" ");
		if (commandCase[0] == '!bunny') {

			//	Commande en cas de pépin
			if (commandCase[1] == 'end') {
				message.channel.send("Je rentre en hibernation !");
				process.exit(0);
			}

			/*	Commande pour récupérer un canal de discussion afin d'y envoyer 
				les alertes de boss */
			if (commandCase[1] == 'init'){
				let oof = 1;
				channel = message.channel;
				if (oof = 1){
					channel.send("Timers de boss initialisés !");
					oof++;
				}
			}

			//	Commande pour un lien sur les mises à jours du jeu
			if (commandCase[1] == 'maj'){
				message.channel.send('Lien vers les mises à jours : <https://community.blackdesertonline.com/index.php?forums/patch-notes.5/>');
			}

			//	Commande pour un lien sur les events actuels du jeu
			if (commandCase[1] == 'event'){
				message.channel.send("Lien vers l'event en cours : <https://community.blackdesertonline.com/index.php?forums/events.6/>");
			}

			//	Commande pour lancer un dé a 6 faces
			if (commandCase[1] == 'd6') {
				let randNumber = Math.floor(Math.random() * 6) + 1;
				message.reply(` vous avez obtenu un ${randNumber} !`);
			}

			/*	Commande pour avoir toutes les syntaxes de commandes, cette commande est affichée
				en dessous du nom du bot et est donc visible par tout les utilisateurs */
			if (commandCase[1] == 'help'){
				message.channel.send(
					`Bonjour, je suis le Bunnybot ! Voici mes commandes et syntaxes.

					!bunny fail FAILSTACK NIVEAU_D'ITEM : Affiche les pourcentages de chances d'upgrade X items avec Y failstacks. (Exemple : !bunny fail 30 TRI)
					!bunny failtab : Affiche la liste des failstack maximums pour chaque amélioration dans l'ordre croissant.
					!bunny links : Afficher des liens utiles contenant des informations importantes.
					!bunny event : Afficher le lien vers l'event en cours.
					!bunny maj : Afficher le lien vers les patch notes.
					!bunny d6 : lancer un dé a 6 faces.
					!bunny init : à lancer dans le canal de discussion pour setup le boss timer`)
			}

			//	Commande qui initie la séquence de calculs d'évènements
			if (commandCase[1] == 'fail') { 
				var nbEntier = parseInt(commandCase[2]); 

				if(Number.isInteger(nbEntier) && nbEntier >= 0 && nbEntier <= 124){ 
					for (i=0; i< amelio.length; i++) { 
						calcStats(message,i); 
					} 
				} else { 
					message.reply(`Mauvaise commande, tapez !bunny help pour les syntaxes`);
				}
			}

			//	Commande qui poste dans le canal le tableau contenant les coéfficients
			else if (commandCase[1] == 'failtab'){
				message.channel.send(failtab);
			}

			//	Commande pour avoir les liens utiles	
			else if (commandCase[1] == 'links'){
				message.channel.send(
					`Voici les liens les plus utiles pour BDO :

					Carte pour nodes et villes ect... <http://www.somethinglovely.net/bdo/>
					Calculateur de trading (crates, fish ect...) <http://www.somethinglovely.net/bdo/crates/> 
					Timer de boss (Europe) <https://bdobosstimer.com/?&server=eu>
					Tout savoir sur l'équipement et comment se stuff (en anglais) <https://grumpygreen.cricket/bdo-gear-progression-guide.html>
					Bonne chaine youtube de guides sur l'économie (entre autres & en anglais) <https://www.youtube.com/channel/UC130oC2JmKYmdPQhJ2tVLog>

					`);
			}

			//	Si la syntaxe est fausse, renvoie l'utilisateur sur la commande d'aide
			else if (commandCase[1] != 'failtab' && commandCase[1] != 'fail' && commandCase[1] != 'maj' && commandCase[1] != 'event' && commandCase[1] != 'help' && commandCase[1] != 'd6' && commandCase[1] != 'init') {
				message.reply(`Mauvaise commande, tapez !bunny help pour les syntaxes`);
			}
		}
	});
};
