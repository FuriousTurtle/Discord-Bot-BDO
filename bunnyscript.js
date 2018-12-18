const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on('ready', () => {
	console.log('Bot ON');
	bot.user.setActivity("Pour l'aide : !bunny help");
});

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

let pourcentages = {
	huit : 2.5,
	neuf : 2,
	dix : 1.5,
	onze : 1.25,
	douze : 0.75,
	treize : 0.63,
	quatorze : 0.5,
	quinze : 0.5,
	PRI : 1.5,
	DUO : 0.75,
	TRI : 0.5,
	TET : 0.25,
	PEN : 0.25
};

bot.on('message', function (message) {

	let commande = message.content;
	let commandCase = commande.split(" ");
	if (commandCase[0] == '!bunny') {
		if (commandCase[1] == 'end') {
			message.channel.send("Je rentre en hibernation !");
			process.exit(0);
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
!bunny d6 : lancer un dé a 6 faces.`)
		}
		if (commandCase[1] == 'fail') {
			var nbEntier = parseInt(commandCase[2]);
			if(Number.isInteger(nbEntier) && nbEntier >= 0 && nbEntier <= 124){
				if (commandCase[3] == '+7') {
					chancetotal = 20 + (pourcentages.huit * commandCase[2]);
					message.reply(`les chances d'upgrade un item ${commandCase[3]} avec ${commandCase[2]} failstacks sont de ${chancetotal}%`)
				}
				else if (commandCase[3] == '+8') {
					chancetotal = 17.5 + (pourcentages.neuf * commandCase[2]);
					message.reply(`les chances d'upgrade un item ${commandCase[3]} avec ${commandCase[2]} failstacks sont de ${chancetotal}%`)
				}
				else if (commandCase[3] == '+9') {
					chancetotal = 15 + (pourcentages.dix * commandCase[2]);
					message.reply(`les chances d'upgrade un item ${commandCase[3]} avec ${commandCase[2]} failstacks sont de ${chancetotal}%`)
				}
				else if (commandCase[3] == '+10') {
					chancetotal = 12.5 + (pourcentages.onze * commandCase[2]);
					message.reply(`les chances d'upgrade un item ${commandCase[3]} avec ${commandCase[2]} failstacks sont de ${chancetotal}%`)
				}
				else if (commandCase[3] == '+11') {
					chancetotal = 10 + (pourcentages.douze * commandCase[2]);
					message.reply(`les chances d'upgrade un item ${commandCase[3]} avec ${commandCase[2]} failstacks sont de ${chancetotal}%`)
				}
				else if (commandCase[3] == '+12') {
					chancetotal = 7.5 + (pourcentages.treize * commandCase[2]);
					message.reply(`les chances d'upgrade un item ${commandCase[3]} avec ${commandCase[2]} failstacks sont de ${chancetotal}%`)
				}
				else if (commandCase[3] == '+13') {
					chancetotal = 5 + (pourcentages.quatorze * commandCase[2]);
					message.reply(`les chances d'upgrade un item ${commandCase[3]} avec ${commandCase[2]} failstacks sont de ${chancetotal}%`)
				}
				else if (commandCase[3] == '+14') {
					chancetotal = 2.5 + (pourcentages.quinze * commandCase[2]);
					message.reply(`les chances d'upgrade un item ${commandCase[3]} avec ${commandCase[2]} failstacks sont de ${chancetotal}%`)
				}
				else if (commandCase[3] == '+15') {
					chancetotal = 15 + (pourcentages.PRI * commandCase[2]);
					message.reply(`les chances d'upgrade un item ${commandCase[3]} avec ${commandCase[2]} failstacks sont de ${chancetotal}%`)
				}
				else if (commandCase[3] == 'PRI') {
					chancetotal = 7.5 + (pourcentages.DUO * commandCase[2]);
					message.reply(`les chances d'upgrade un item ${commandCase[3]} avec ${commandCase[2]} failstacks sont de ${chancetotal}%`)
				}
				else if (commandCase[3] == 'DUO') {
					chancetotal = 5 + (pourcentages.TRI * commandCase[2]);
					message.reply(`les chances d'upgrade un item ${commandCase[3]} avec ${commandCase[2]} failstacks sont de ${chancetotal}%`)
				}
				else if (commandCase[3] == 'TRI') {
					chancetotal = 2 + (pourcentages.TET * commandCase[2]);
					message.reply(`les chances d'upgrade un item ${commandCase[3]} avec ${commandCase[2]} failstacks sont de ${chancetotal}%`)
				}
				else if (commandCase[3] == 'TET') {
					chancetotal = 1.5 + (pourcentages.PEN * commandCase[2]);
					message.reply(`les chances d'upgrade un item ${commandCase[3]} avec ${commandCase[2]} failstacks sont de ${chancetotal}%`)
				} else {
					message.reply(`Mauvaise commande, tapez !bunny help pour les syntaxes`);
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
		else if (commandCase[1] != 'failtab' && commandCase[1] != 'fail' && commandCase[1] != 'help' && commandCase[1] != 'd6') {
			message.reply(`Mauvaise commande, tapez !bunny help pour les syntaxes`);
		}
	}
});

var keyRaw = require('./key.js');
var keyString = keyRaw.key;
bot.login(keyString);