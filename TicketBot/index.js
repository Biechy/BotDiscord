const fs = require('fs'); //librairie pour gérer no commande avec un 'commandeHandler'
const Discord = require('discord.js'); //import la libraire discord.js

const config = require('./config.json');

client = new Discord.Client({
    fetchAllMembers: true, //necessaire depuis une maj
    partials: ['MESSAGE', 'REACTION'] //permet de déclancher des reactions de message envoyer avant la création du bot
});
client.db = require('./db.json');

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Ready!');
});

client.login(config.token); //permet de se co à partir du token de notre bot

client.on('message', message => { //le bot régis qd il re coit un message
    if (message.type !== 'DEFAULT' || message.author.bot) return; //si c'est un message différent de défault et pas du bot
    if (!message.content.startsWith(config.prefix)) return; //check si ca commence par le bon préfixe
    const tempArgs = message.content.slice(config.prefix.length).split(' ');
    const commandName = tempArgs.shift().toLowerCase();
    const args = [ tempArgs[0], ...parseArgs(message.content) ];
    if (!client.commands.has(commandName)) return message.channel.send("Cette commande n'existe pas");
    const command = client.commands.get(commandName); //si oui ca va chercher la commande (en enlever le t!)
    console.log(`Command: ${commandName}; args: ${args}`);
    command.run(message, args);
    message.delete()
});


client.on('messageReactionAdd', (messageReaction , user) => { //reagis lors d'une reaction
    if (!messageReaction.message.guild || user.bot) return; //si y a pas de reaction ou si c'est un bot

    const reactionTicketElem = config.reactionTicket[messageReaction.message.id]
    if (!reactionTicketElem) return messageReaction.users.remove(user)//si la reaction n'est pas un émoji souhaiter

    const prop = messageReaction.emoji.id ? 'id' : 'name';
    const emoji = reactionTicketElem.emojis.find(emoji => emoji[prop] === messageReaction.emoji[prop]);
    
    if (emoji.id === "789450125281984542" ) { 
        const command = messageReaction.client.commands.get('ticketAchat');
        messageReaction.message.author = user;
        command.run(messageReaction.message, []);  //questce quon fait si cette émoji est le bon
        messageReaction.users.remove(user); //supprime la reaction

    }
    if (emoji.id === "787945770442686475" ) { 
        const command = messageReaction.client.commands.get('ticketreclamation');
        messageReaction.message.author = user;
        command.run(messageReaction.message, []);  //questce quon fait si cette émoji est le bon
        messageReaction.users.remove(user); //supprime la reaction

    }
});












/* */

function parseArgs(str) {
    const regex1 = /--[^-]+/g;
    const regex2 = /[^\s"]+|"([^"]*)"/gi;
    const regex3 = /--[^ ]+/gi;

    var myArray = [];
    var myArray2 = [];

    var args = [];

    do {
        //Each call to exec returns the next regex match as an array
        var match = regex1.exec(str);
        if (match != null)
        {
            //Index 1 in the array is the captured group if it exists
            //Index 0 is the matched text, which we use if no captured group exists
            myArray.push(match[1] ? match[1] : match[0]);
        }
    } while (match != null);

    var args = [];

    myArray.forEach((str) => {
        arg = {
            name: str.match(regex3)[0].slice(2),
            params: []
        };

        do {
            //Each call to exec returns the next regex match as an array
            var match = regex2.exec(str);
            if (match != null)
            {
                //Index 1 in the array is the captured group if it exists
                //Index 0 is the matched text, which we use if no captured group exists
                arg.params.push(match[1] ? match[1] : match[0]);
            }
        } while (match != null);

        arg.params = arg.params.slice(1);
        args.push(arg);
    });

    return args;
}