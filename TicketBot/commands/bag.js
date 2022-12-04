const config = require ('../config.json');
const fs = require('fs');
const { Emoji, Collector, MessageEmbed } = require('discord.js');
Discord = require('discord.js');

module.exports = {
    name:'bag',
    guildOnly: true,
    run: async (message, args) => {
        var embed = new Discord.MessageEmbed().setDescription(`L'accessoire de mode indispensable à se faire voler dans la rue.
        
        Tiens voici le lien de la fiche produit, et puis tu sais un sac c'est surtout fait pour promener son caniche ! https://forms.gle/sPHhDF6h88CNCRVd6
        
        Et si tu as fini, tu peux aller en caisse avec le bouton 🪙,  si tu veux encore plus de produits clic sur la réaction correspondant au produit voulu`).setColor('RANDOM')

        message.channel.send(embed).then(embedMessage => {
            embedMessage.react('\u0031\u20E3');
            embedMessage.react('\u0032\u20E3');
            embedMessage.react('\u0033\u20E3');
            embedMessage.react('🪙');

            const filter = (reaction , user) =>{
                return user.id === message.author.id && !user.bot;
            }
            const collector = embedMessage.createReactionCollector(filter, {max: 1})
            collector.on('collect', (reaction,user) => {
                reaction.client.db.tickets[reaction.message.channel.id].achats.push('bag');
                fs.writeFileSync('./db.json', JSON.stringify(message.client.db));
                if (reaction.emoji.name == '1⃣') {
                    const command = reaction.client.commands.get('hoodie');
                    reaction.message.author = user;
                    command.run(reaction.message, []);
                    return
                }
                if (reaction.emoji.name == '2⃣') {
                    const command = reaction.client.commands.get('tee');
                    reaction.message.author = user;
                    command.run(reaction.message, []);
                    return
                }
                if (reaction.emoji.name == '3⃣') {
                    message.channel.send(new Discord.MessageEmbed().setDescription(`Il en faut toujours plus quand on fait ses courses chez Channel...`).setColor('RANDOM'))
                    const command = reaction.client.commands.get('bag');
                    reaction.message.author = user;
                    command.run(reaction.message, []);
                    return
                }
                if (reaction.emoji.name == '🪙') {
                    const command = reaction.client.commands.get('caisse');
                    reaction.message.author = user;
                    command.run(reaction.message, []);
                    return
                }
                if (reaction.emoji.name == '🪙') {
                    const command = reaction.client.commands.get('caisse');
                    reaction.message.author = user;
                    command.run(reaction.message, []);
                    return
                }

            });
            
        }).catch(err => console.error(err))

        
    }
} 