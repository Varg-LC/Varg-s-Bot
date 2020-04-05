const Discord = require('discord.js');
const fs = require("fs");
const bot = new Discord.Client();
const token = '';
const PREFIX = ""

let points = JSON.parse(fs.readFileSync("./points.json", "utf8"));

bot.on('ready', () => {
    console.log('Online!');
})

bot.on('message', message=>{
    //if (!message.content.startsWith(prefix)) return;
    // if (message.author.bot) return;

    let args = message.content.substring(PREFIX.length).split(" ");

    switch(args[0]){

        //Kaamelott        
        case 'Poulette?':
            message.channel.send('Elle est bien cachée !')
            break;
        case 'Merci':
            message.channel.send('De rien')
            break;
        case 'Hey':
            var arrLoth = ["Ave Cesar, rosae rosam, et spiritus rex !\nAh non, parce que là, j’en ai marre !", "Tempora mori, tempora mundis recorda.\nVoilà. Eh bien ça, par exemple, ça veut absolument rien dire, mais l’effet reste le même,\net pourtant j’ai jamais foutu les pieds dans une salle de classe attention !", 
                "Victoriae mundis et mundis lacrima.", "Mundi placet et spiritus minima", 
                "Pourquoi trahir sans arrêt les gens avec qui je collabore ?\nJe dirais que c\'est probablement une réponse compulsive à une crainte de m\'attacher.\nBriser une relation plutôt que la cultiver pour ne pas se retrouver démuni face au bonheur.\nOui, pour répondre à votre question : j\'ai peur d'aimer !",
                          "Moi, quand ma garce de femme est là, ça déménage pas mal aussi… Hier, elle m’a fendu le tibia avec une amphore, la salope !"]; 

                if(args[1] === 'Loth'){
                if(args[2] === '!'){
                    message.channel.send(arrLoth[Math.floor(Math.random()*arrLoth.length)]);}}
            break;
    }                    
    //Jeux du ouais! 
    if (message.content.search(/ouais/i) > -1 ){
        var arrOuais = ["Ouais c'est bon ça !", "Trop de ouais...", "AbsolutMotherFuckingOuais"]

        if (!points[message.author.id]) points[message.author.id] = {
            points: 0,
            niveau: arrOuais[1]
            };

        let userData = points[message.author.id];
        userData.points++;
        
        if (message.content.search(/clear/i) > -1 ){userData.points = 1};

        if (userData.points < 5) {userData.level = arrOuais[0];}
         else if (userData.points >10){userData.level = arrOuais[2];}
         else {userData.level = arrOuais[1];}
    
        fs.writeFile("./points.json", JSON.stringify(points), (err) => {
        if (err) console.error(err)
        });
        
        const embed = new Discord.MessageEmbed()
        .setTitle('Jeux du ouais !')
        .addField('Nom', message.author.username, true)
        .addField('Points', userData.points, true)
        .addField('Niveau', userData.level)
        .setColor(0xE94314)
        message.channel.send(embed);
    }

    //Clear messages channel
    if (message.content === "Clear Channel"){
        if (message.author.id === '298852151638097920'){
            message.channel.bulkDelete(100)
        }
    }
})

bot.login(process.env.TOKEN);
