const Discord = require('discord.js');
const bot = new Discord.Client();
global.window = global;
let channel;

var keyRaw = require('./key.js');
var keyString = keyRaw.key;
bot.login(keyString);

bot.on('ready', () => {
	console.log('Bot ON');
	bot.user.setActivity("Pour l'aide : !bunny help");
    loop();
});

let day = 1;
let hours;
let mins;
let today;
let commandCase = [];

function refreshDate(){
	today = new Date();
//	day = today.getDay();
hours = today.getHours();
mins = today.getMinutes();
console.log("maj de l'heure");
console.log(`Il est ${hours}:${mins} !`);
}

function calcSpawn(nb1, nb2, tab2, boss) {
	if (hours == tab2[nb1] && (mins == parseInt(tab2[nb2]) - 15 || (parseInt(tab2[nb2]) == 15 && mins == 0))) {
		channel.send('Le boss Kzarka va spawn dans 15 minutes !'); 
		console.log(`${hours}:${mins} => spawn de ${boss}`); 
	}
}

function calcDay(nbd, tab1, boss){
	if (day == nbd){
		global.tab2 = (String(tab1[nbd])).split(','); 
		for(k = 0, l = 1 ; l < tab2.length ; k += 2, l +=2) { 
			calcSpawn(k, l, tab2, boss); 
		}
	}
}

function calcStats(message, nbi){ 
	if (commandCase[3] == amelio[nbi]) { 
		chancetotal = parseInt(coeffAmelio[nbi]) + (pourcentages[nbi] * commandCase[2]);
		message.reply(`les chances d'upgrade un item ${commandCase[3]} avec ${commandCase[2]} failstacks sont de ${chancetotal}%`); 
	} 
} 


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

let amelio = ['+7', '+8', '+9', '+10', '+11', '+12', '+13', '+14', '+15', 'PRI', 'DUO', 'TRI', 'TET'];
let coeffAmelio = ['20', '17.5', '15', '12.5', '10', '7.5', '5', '2.5', '15', '7.5', '5', '2', '1.5'];
let pourcentages = ['2.5', '2', '1.5', '1.25', '0.75', '0.63', '0.5', '0.5', '1.5', '0.75', '0.5', '0.25', '0.25'];
let daysTab = ['1', '2', '3', '4', '5', '6', '7'];

let kzarkaTab = {
	1 : ['00,15', '05,60', '09,60', '22,15'],
	2 : ['05,60'],
	3 : ['05,60', '16,60', '22,15'],
	5 : ['00,15', '19,60', '22,15'],
	6 : ['19,60'],
	7 : ['02,60', '12,60']
}

setInterval(refreshDate, 60000);

function loop(){

	for(p = 0; p < daysTab.length; p++){
		calcDay(p, kzarkaTab, "Kzarka");
	}

	bot.on('message', function (message) {

		let commande = message.content;
		commandCase = commande.split(" ");
		if (commandCase[0] == '!bunny') {
			if (commandCase[1] == 'end') {
				message.channel.send("Je rentre en hibernation !");
				process.exit(0);
			}
			if (commandCase[1] == 'init'){
				let oof = 1;
				channel = message.channel;
				if (oof = 1){
					channel.send("Timers de boss initialisés ! (Kzarka seulement pour l'instant)");
					oof++;
				}
			}
			if (commandCase[1] == 'maj'){
				message.channel.send('Lien vers les mises à jours : <https://community.blackdesertonline.com/index.php?forums/patch-notes.5/>');
			}
			if (commandCase[1] == 'event'){
				message.channel.send("Lien vers l'event en cours : <https://community.blackdesertonline.com/index.php?forums/events.6/>");
			}
			if (commandCase[1] == 'd6') {
				let randNumber = Math.floor(Math.random() * 6) + 1;
				message.reply(` vous avez obtenu un ${randNumber} !`);
			}
			if (commandCase[1] == 'help'){
				message.channel.send(
					`Bonjour, je suis le Bunnybot ! Voici mes commandes et syntaxes.

					!bunny fail FAILSTACK NIVEAU_D'ITEM : Affiche les pourcentages de chances d'upgrade X items avec Y failstacks. (Exemple : !bunny fail 30 TRI)
					!bunny failtab : Affiche la liste des failstack maximums pour chaque amélioration dans l'ordre croissant.
					!bunny links : Afficher des liens utiles contenant des informations importantes.
					!bunny event : Afficher le lien vers l'event en cours.
					!bunny maj : Afficher le lien vers les patch notes.
					!bunny d6 : lancer un dé a 6 faces.`)
			}
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
			else if (commandCase[1] == 'failtab'){
				message.channel.send(failtab);
			}
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
			else if (commandCase[1] != 'failtab' && commandCase[1] != 'fail' && commandCase[1] != 'maj' && commandCase[1] != 'event' && commandCase[1] != 'help' && commandCase[1] != 'd6' && commandCase[1] != 'init') {
				message.reply(`Mauvaise commande, tapez !bunny help pour les syntaxes`);
			}
		}
	});
};
