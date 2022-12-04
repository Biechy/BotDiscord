const config = require ('../config.json');
const fs = require('fs');
const { Emoji, Collector } = require('discord.js');
Discord = require('discord.js');

module.exports = {
    name:'ticketachat',
    guildOnly: true,
    run: async (message, args) => {
        if (Object.values(message.client.db.tickets).some(ticket => ticket.author === message.author.id)) return;
        const channel = await message.guild.channels.create(`ticket ${message.author.username}`, {
            type: 'text',
            parent: config.ticket.category, //la où on va regrouper nos tickets
            permissionOverwrites: [{ //donne les permissions
                id: message.guild.roles.everyone.id, //interdit everyone
                deny: 'VIEW_CHANNEL'
            }, {
                id : message.author.id, //authorise l'auteur du message
                allow: 'VIEW_CHANNEL'
            }] 
        });
        message.client.db.tickets[channel.id] = {
            author: message.author.id,
            achats: []
        };
        fs.writeFileSync('./db.json', JSON.stringify(message.client.db)) //enregistre le message
        var embed = new Discord.MessageEmbed().setDescription(`Bonjour ${message.member}, je suis le sbire Gauthier... Très renommé dans le milieu de la mode. 
        \n Oula oui je vois qu'il te faut impérativement un nouvel apparat.
         \n Ici on a tout :
          \n :one: hoodie (25€) 
          \n :two: tee (20€ ou 15€ si tu l'achètes avec un hoodie) 
          \n :three: sac en toile (8€ ou 5€ si tu l'achètes avec un hoodie). 
          \n Personellement, je pense qu'il te faudra les trois pour rattraper cela... 
          \n\n Que décides-tu ? Clic sur les réactions du produit voulu ! `).setColor('RANDOM')
        
        channel.send(embed).then(embedMessage => {
            embedMessage.react('\u0031\u20E3');
            embedMessage.react('\u0032\u20E3');
            embedMessage.react('\u0033\u20E3');

            const filter = (reaction , user) =>{
                return user.id === message.author.id && !user.bot;
            }
            const collector = embedMessage.createReactionCollector(filter, {max: 1})
            collector.on('collect', (reaction, user) => {
                if (reaction.emoji.name == '1⃣') {
                    const command = reaction.client.commands.get('hoodie');
                    reaction.message.author = user;
                    command.run(reaction.message, []);
                }
                if (reaction.emoji.name == '2⃣') {
                    const command = reaction.client.commands.get('tee');
                    reaction.message.author = user;
                    command.run(reaction.message, []);
                }
                if (reaction.emoji.name == '3⃣') {
                    const command = reaction.client.commands.get('bag');
                    reaction.message.author = user;
                    command.run(reaction.message, []);
                }
            });
            
        }).catch(err => console.error(err))

        
    }
} 