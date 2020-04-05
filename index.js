const Discord = require('discord.js');
const fs = require("fs");
const bot = new Discord.Client();
const token = '';
const PREFIX = ""
const sounds = './Sounds/';

let points = JSON.parse(fs.readFileSync("./points.json", "utf8"));

var arrayList = new Array()
arrayList = ["poils", "héro", "ah c'est ça", "crame mecs", "c'est nous", "alternative", "boire", "bite", "miches", "fôret", "je sais pas", "parler", "arthur", "fromage", "chance", "ave", "kadoc", "volette", "assassin", "tard", "roulettes", "raison", "bataille", "manger", "bohort", "dinde", "pédagogie", "révolte", "cassez", "bucher", "au bucher", "bucher !", "burgonde", "les autres", "change", "discussion", "vite", "vomis", "glander", "bien fait", "histoire", "c'est de la merde", "dur", "honteux", "glandus", "ambiance", "flèches", "faux", "faux", "rigolo", "sinécure", "filiforme", "prodigieux", "blague", "reste", "picole", "charmant", "marteau", "chier", "comment", "bèche", "boules", "crame", "cramer", "cuillère", "cuillère arthur", "comprend", "vêtement", "trou du cul", "nord", "tirez vous", "tocard", "écarte", "poulette", "enquille", "pute", "mignone", "épique", "barrer", "pigeon", "permis", "merde", "encore", "quelqu'un", "exagerer", "à la zob", "faut", "ferme", "féderer", "ta gueule", "à poil", "unijambiste", "fleur", "pomme", "fort en pomme", "notice", "fulgurant", "cul", "c'est ça", "porcelet", "connais pas", "beau", "code", "pue", "tatan", "pisser", "insipide", "interprète", "comaque", "cherche", "entendu", "tronches", "paysan", "dit fort", "perdu", "graines", "poney", "battre", "capital", "cons", "plein air", "je vois", "bretagne", "trouble", "vivre", "vous dire", "vous faut", "raclette", "confiance", "pas chez moi", "enlever", "caisse", "idiote", "à l'air", "bouffe", "carbure", "gerbe", "monstruosité", "canard", "pigeons", "graal", "gras", "pognon", "poisson", "qui l'ouvre", "parole", "fiolle", "discutailler", "pas possible", "sont pour rien", "important", "emmerde", "foutre", "dingue", "tout à fait", "développer", "forme", "femme", "mécréant", "mécréant !", "merci", "météo", "beurre", "ours", "gonzesse", "armure", "toujours dit", "toujours dit que", "écoute", "école", "mordu", "taisez vous", "pusso", "vacherie", "marre", "vache", "défis", "gros", "fort", "plaisante", "alcool", "galette", "lapin", "son nom", "conne", "indépendant", "corne", "diagonale", "sang", "plait-il", "politique", "pourquoi pas", "et pourquoi pas", "gueule", "détail", "vent", "connerie", "pucelle", "grouille", "fort ce con", "que ceci", "raide", "savoir pourquoi", "fâche", "quequette", "quies", "ranger", "slibard", "crêpe", "carer", "déconner", "charrette", "scorpion", "attache", "faisant", "vendeur", "du cul", "gros cul", "glands", "crêpes", "flan", "pequenauds", "très bien", "la ferme", "execution", "quart d'heure", "cake", "fion", "foutre la merde", "pro", "merdique", "tarlouze", "admettez", "mouilles", "déconnez", "con", "crache", "utilisez", "rigole", "nuque", "impressionnant", "mortel", "zut"]
var arrOuais = ["Initié", "Connaisseur", "AbsolutMotherFucker"]

bot.on('ready', () => {
    console.log('Online!');
})

bot.on('message', message=>{
    //if (!message.content.startsWith(prefix)) return;
    if (!message.author.bot){

    let args = message.content.substring(PREFIX.length).split(" ");
  
    if (message.content.search(/Loth/i) > -1 ){
        var arrLoth = [
        "Ave Cesar, rosae rosam, et spiritus rex !\nAh non, parce que là, j’en ai marre !",
        "Tempora mori, tempora mundis recorda.\nVoilà. Eh bien ça, par exemple, ça veut absolument rien dire, mais l’effet reste le même,\net pourtant j’ai jamais foutu les pieds dans une salle de classe attention !", 
        "Victoriae mundis et mundis lacrima.",
        "Mundi placet et spiritus minima", 
        "Pourquoi trahir sans arrêt les gens avec qui je collabore ?\nJe dirais que c\'est probablement une réponse compulsive à une crainte de m\'attacher.\nBriser une relation plutôt que la cultiver pour ne pas se retrouver démuni face au bonheur.\nOui, pour répondre à votre question : j\'ai peur d'aimer !",
        "Moi, quand ma garce de femme est là, ça déménage pas mal aussi… Hier, elle m’a fendu le tibia avec une amphore, la salope !"]; 

        message.channel.send(arrLoth[Math.floor(Math.random()*arrLoth.length)]);
    } 
         
    //Points kaamelott
    if (message.content === '!Kaamelott' ){

        if (!points[message.author.id]) points[message.author.id] = {
            points: 0,
            niveau: arrOuais[1]
            };
        let userData = points[message.author.id];
        
        if (userData.points < 5) {userData.level = arrOuais[0];}
         else if (userData.points >10){userData.level = arrOuais[2];}
         else {userData.level = arrOuais[1];}
    
        fs.writeFile("./points.json", JSON.stringify(points), (err) => {
        if (err) console.error(err)
        });
        
        const embed = new Discord.MessageEmbed()
        .setTitle('Kaamelott sounds')
        .addField('Nom', message.author.username, true)
        .addField('Points', userData.points, true)
        .addField('Niveau', userData.level)
        .setColor(0xE94314)
        message.channel.send(embed);
    }

    //Voice chat Kaamelott
    if (message.content.charAt(0) === "!" ) {
        var msg = message.content.toLowerCase()
        for(var i = 0; i < arrayList.length ; i++){            
            if (msg.search(arrayList[i]) > -1 ) {
                var position = i;
                // Si il est sur un channel de discution vocale
                if (message.member.voice.channel) {
                    // Je récupère le channel
                    let voiceChannel = message.member.voice.channel;
                    
                    // Je m'y connecte
                    voiceChannel
                        .join()
                        .then(connection => {
                            // J'ouvre le dossier des sons de kaamelott
                            fs.readdir(sounds, (err, files) => {
                                var sound = files[position];
                                connection.play(sounds + sound);
                                if (!points[message.author.id]) points[message.author.id] = {
                                    points: 0,
                                    niveau: arrOuais[1]
                                    };
                                let userData = points[message.author.id];
                                userData.points++;
                                
                                if (userData.points < 5) {userData.level = arrOuais[0];}
                                 else if (userData.points >10){userData.level = arrOuais[2];}
                                 else {userData.level = arrOuais[1];}
                            
                                fs.writeFile("./points.json", JSON.stringify(points), (err) => {
                                if (err) console.error(err)
                                });
                            });
                        })
                        .catch((err) => {
                            //console.log(err);
                            message.channel.send(err);
                        });
                } else {
                    // Si l'utilisateur n'est pas sur un channel on le remercie poliment
                    //message.channel.send('You shall not pass away from audio channel...');
                }
    
    }}}
    //Clear messages channel
    if (message.content === "Clear Channel"){
        if (message.author.id === '298852151638097920'){
            message.channel.bulkDelete(100)
        }
    }
}})

bot.login(process.env.TOKEN);
