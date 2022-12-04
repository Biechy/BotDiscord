const config = require ('../config.json');
const fs = require('fs');
const { Emoji, Collector } = require('discord.js');
Discord = require('discord.js');

module.exports = {
    name:'tee',
    guildOnly: true,
    run: async (message, args) => {
        var embed = new Discord.MessageEmbed().setDescription(`Un t-shirt, vraiment ? Autant assiner la marinière !

        Tiens voici le lien de la fiche produit, remplie la bien sinon tu finiras comme Jean Claude Vandam dans tous ses films (torse-nu quoi) ! https://forms.gle/KKXgF65r9Jhkj1qH8
        
        Et si tu as fini, tu peux aller en caisse avec le bouton 🪙, si tu veux encore plus de produits clic sur la réaction correspondant au produit voulu`).setColor('RANDOM')

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
                reaction.client.db.tickets[reaction.message.channel.id].achats.push('tee');
                fs.writeFileSync('./db.json', JSON.stringify(message.client.db));
                if (reaction.emoji.name == '1⃣') {
                    const command = reaction.client.commands.get('hoodie');
                    reaction.message.author = user;
                    command.run(reaction.message, []);
                    return
                }
                if (reaction.emoji.name == '2⃣') {
                    message.channel.send(new Discord.MessageEmbed().setDescription(`Eh bah toujours plus hein ? Comme en nourriture à ce que je vois...`).setColor('RANDOM'));
                    const command = reaction.client.commands.get('tee');
                    reaction.message.author = user;
                    command.run(reaction.message, []);
                    return
                }
                if (reaction.emoji.name == '3⃣') {
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
            });
            
        }).catch(err => console.error(err))

        
    }
} 