const Discord = require('discord.js');
const fs = require("fs");
const bot = new Discord.Client();
const token = '';

EventEmitter=require('events').EventEmitter,
filesEE=new EventEmitter();

const PREFIX = "KM"
const sounds = './Sounds/';
const playedGame = 'écrire : KM Aide';

let points = JSON.parse(fs.readFileSync("./points.json", "utf8"));

var listMotCle = ["poils", "héro", "ah c'est ça", "crame mecs", "c'est nous", "alternative", "boire", "bite", "miches", "fôret", "je sais pas", "parler", "arthur", "fromage", "chance", "ave", "kadoc", "volette", "assassin", "tard", "roulettes", "raison", "bataille", "manger", "bohort", "dinde", "pédagogie", "révolte", "cassez", "bucher", "au bucher", "bucher !", "burgonde", "les autres", "change", "discussion", "vite", "vomis", "glander", "bien fait", "histoire", "c'est de la merde", "dur", "honteux", "glandus", "ambiance", "flèches", "faux", "faux", "rigolo", "sinécure", "filiforme", "prodigieux", "blague", "reste", "picole", "charmant", "marteau", "chier", "comment", "bèche", "boules", "crame", "cramer", "cuillère", "cuillère arthur", "comprend", "vêtement", "trou du cul", "nord", "tirez vous", "tocard", "écarte", "poulette", "enquille", "pute", "mignone", "épique", "barrer", "pigeon", "permis", "merde", "encore", "quelqu'un", "exagerer", "à la zob", "faut", "ferme", "féderer", "ta gueule", "à poil", "unijambiste", "fleur", "pomme", "fort en pomme", "notice", "fulgurant", "cul", "c'est ça", "porcelet", "connais pas", "beau", "code", "pue", "tatan", "pisser", "insipide", "interprète", "comaque", "cherche", "entendu", "tronches", "paysan", "dit fort", "perdu", "graines", "poney", "battre", "capital", "cons", "plein air", "je vois", "bretagne", "trouble", "vivre", "vous dire", "vous faut", "raclette", "confiance", "pas chez moi", "enlever", "caisse", "idiote", "à l'air", "bouffe", "carbure", "gerbe", "monstruosité", "canard", "pigeons", "graal", "gras", "pognon", "poisson", "qui l'ouvre", "parole", "fiolle", "discutailler", "pas possible", "sont pour rien", "important", "emmerde", "foutre", "dingue", "tout à fait", "développer", "forme", "femme", "mécréant", "mécréant !", "merci", "météo", "beurre", "ours", "gonzesse", "armure", "toujours dit", "toujours dit que", "écoute", "école", "mordu", "taisez vous", "pusso", "vacherie", "marre", "vache", "défis", "gros", "fort", "plaisante", "alcool", "galette", "lapin", "son nom", "conne", "indépendant", "corne", "diagonale", "sang", "plait-il", "politique", "pourquoi pas", "et pourquoi pas", "gueule", "détail", "vent", "connerie", "pucelle", "grouille", "fort ce con", "que ceci", "raide", "savoir pourquoi", "fâche", "quequette", "quies", "ranger", "slibard", "crêpe", "carer", "déconner", "charrette", "scorpion", "attache", "faisant", "vendeur", "du cul", "gros cul", "glands", "crêpes", "flan", "pequenauds", "très bien", "la ferme", "execution", "quart d'heure", "cake", "fion", "foutre la merde", "pro", "merdique", "tarlouze", "admettez", "mouilles", "déconnez", "con", "crache", "utilisez", "rigole", "nuque", "impressionnant", "mortel", "zut"]
var listeNomNiveau = ["Un connard de romain", "Un abruti fini", "Un champion du lancé de caillou", "Le Tavernier", "Une grosse dine", "Capo di tutti capi", "Le Prix nobel Kadoc", "Une branche", "Un choux fleur", "Le vainceur du joug Romain"]
var listeCitaLoth = [
    "Ave Cesar, rosae rosam, et spiritus rex !\nAh non, parce que là, j’en ai marre !",
    "Tempora mori, tempora mundis recorda.\nVoilà. Eh bien ça, par exemple, ça veut absolument rien dire, mais l’effet reste le même,\net pourtant j’ai jamais foutu les pieds dans une salle de classe attention !", 
    "Victoriae mundis et mundis lacrima.",
    "Mundi placet et spiritus minima", 
    "Pourquoi trahir sans arrêt les gens avec qui je collabore ?\nJe dirais que c\'est probablement une réponse compulsive à une crainte de m\'attacher.\nBriser une relation plutôt que la cultiver pour ne pas se retrouver démuni face au bonheur.\nOui, pour répondre à votre question : j\'ai peur d'aimer !",
    "Moi, quand ma garce de femme est là, ça déménage pas mal aussi… Hier, elle m’a fendu le tibia avec une amphore, la salope !"
]; 

var listSons = new Array()
fs.readdir(sounds, function (err, files) { if (err) throw err;
    files.forEach( function (file) {
        listSons.push(file);     
    });
});

/*_________Quand le bot se login_________*/
bot.on('ready', () => {
    console.log('Le Bot est en ligne');
    bot.user.setActivity(playedGame).catch(console.error);
})

/*_________Quand le bot voit un message_________*/
bot.on('message', message=>{
    if (!message.content.startsWith(PREFIX)) return;
    if (message.author.bot) return;

    var msg = message.content.toLowerCase()

    if (msg.search('aide') > -1 ){
        //Affiche l'aide
        const embedAide = new Discord.MessageEmbed()
        .setColor('#6a8c91')
        .setTitle('A propos de Kaamelot Bot')
        .setDescription('Citations audio et texte issues de Kaamelott')
        .addFields(
            //{ name: '\u200B', value: '\u200B' },
            { name: 'Préfix : KM', value: 'Liste des mots clés : KML List. Scores : KM Kaamelott' })
        .setImage('https://i.imgur.com/Byni79f.png')
        .setFooter('Créé par Varg');
        message.channel.send(embedAide);

    } else if (msg.search('list') > -1 ){
        //Poste la liste des commandes
        var stringListMotCle = "aide, list, loth, kaamelott"
        message.channel.send('LISTE DE MOTS CLE\nContextuels : ' + stringListMotCle + '.\nAudio : ', {files: ["https://i.imgur.com/ayriZMk.jpg"]});

    } else if (msg.search('loth') > -1 ){
        //Poste une citation de Loth
        message.channel.send(listeCitaLoth[Math.floor(Math.random()*listeCitaLoth.length)]);

    } else if (msg.search('kaamelott') > -1){
        //Affiche les points pour l'utilisation des citations audio Kaamelott
        if (!points[message.author.id]) points[message.author.id] = {
            points: 0,
            level: listeNomNiveau[Math.floor(Math.random()*listeNomNiveau.length)]
            };
        let userData = points[message.author.id];
        userData.level = listeNomNiveau[Math.floor(Math.random()*listeNomNiveau.length)];

        fs.writeFile("./points.json", JSON.stringify(points), (err) => {
            if (err) console.error(err)
        });
        
        const embedScore = new Discord.MessageEmbed()
        .setColor(0xE94314)
        .setTitle('Score de citation Kaamelott')
        .setThumbnail('https://i.imgur.com/3Zw8g7O.jpg')
        .addField('Bravo ', message.author.username, true)
        .addField('Tu as ', userData.points + ' points', true)
        .addField('Bien joué ! Tu es devenu :', userData.level);
        message.channel.send(embedScore);

    } else {
        //Diffuse dans le channel vocal les citations audio Kaamelott 
        for(var i = 0; i < listMotCle.length ; i++){                   
            if (msg.search(listMotCle[i]) > -1 ) {
                var position = i;

                // Le user est-il sur un channel vocal ?
                if (message.member.voice.channel) {
                    
                    // Récupération du channel
                    let voiceChannel = message.member.voice.channel;
                    
                    // Connection du bot au channel
                    voiceChannel
                        .join()
                        .then(connection => {
                            connection.play(sounds + listSons[position]);
                            if (!points[message.author.id]) points[message.author.id] = {
                                points: 0,
                                niveau: listeNomNiveau[Math.floor(Math.random()*listeNomNiveau.length)]
                                };
                            let userData = points[message.author.id];
                            userData.points++;
                        
                            fs.writeFile("./points.json", JSON.stringify(points), (err) => {
                                if (err) console.error(err)
                            });
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                }
            }
        }
        filesEE.emit('son_joue');
    }
    //Effacer les 100 dernier messages du channel
    const adminID = '298852151638097920'
    if (message.content === "KM Clear Channel"){
        if (message.author.id === adminID){
            message.channel.bulkDelete(100)
        }
    }

    filesEE.on('son_joue',function(){
        if (message.member.voice.channel) {
            let voiceChannel = message.member.voice.channel;
            voiceChannel.leave((err) => {
                console.log(err);
            });
        }
    });
})

bot.login(process.env.TOKEN);