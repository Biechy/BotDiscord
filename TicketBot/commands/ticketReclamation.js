const config = require ('../config.json');
const fs = require('fs');
Discord = require('discord.js');
const { Emoji, Collector } = require('discord.js');

module.exports = {
    name:'ticketreclamation',
    guildOnly: true,
    run: async (message, args) => {
        if (Object.values(message.client.db.reclamations).some(reclamation => reclamation.author === message.author.id)) return;
        const channel = await message.guild.channels.create(`reclamation ${message.author.username}`, {
            type: 'text',
            parent: config.reclamation.category, //la où on va regrouper nos tickets
            permissionOverwrites: [{ //donne les permissions
                id: message.guild.roles.everyone.id, //interdit everyone
                deny: 'VIEW_CHANNEL'
            }, {
                id : message.author.id, //authorise l'auteur du message
                allow: 'VIEW_CHANNEL'
            }] 
        });
        message.client.db.reclamations[channel.id] = {
            author: message.author.id
        };
        fs.writeFileSync('./db.json', JSON.stringify(message.client.db)); //enregistre le message
        channel.send(config.donLucas);
        channel.send(new Discord.MessageEmbed().setDescription(`Yo ${message.member}, ici on est plus chill pour parler tu trouves pas ? \n Alors ca dit quoi ? \n T'inquiète mon boss va pas tarder à arriver, tu peux me parler en attendant... \n \n Tu peux, si tu veux fermer ta réclamation, cliquer sur 🔓`).setColor('RANDOM'))
        .then(embedMessage => {
            embedMessage.react("🔓");
            const filter = (reaction , user) =>{
                return reaction.emoji.name==="🔓" && !user.bot;
            }
            const collector = embedMessage.createReactionCollector(filter, {max: 1})
            collector.on('collect', (reaction, user ) => {
                reaction.message.author = user;
                delete reaction.client.db.reclamations[channel.id];
                fs.writeFileSync('./db.json', JSON.stringify(message.client.db));
                channel.delete();
            });
        });
    }
}