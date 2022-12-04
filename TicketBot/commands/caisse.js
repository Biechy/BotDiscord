const config = require ('../config.json');
const fs = require('fs');
const { Emoji, Collector } = require('discord.js');
const { min } = require('moment');
Discord = require('discord.js');

module.exports = {
    name:'caisse',
    guildOnly: true,
    run: async (message, args) => {
        let nombreHoodie=0;
        let nombreTee=0;
        let nombreBag=0;
        for (let produit of message.client.db.tickets[message.channel.id].achats){
            if (produit==='hoodie') nombreHoodie+=1;
            if (produit==='tee') nombreTee+=1;
            if(produit==='bag') nombreBag+=1
        }
        const prix = (nombreHoodie*25 + nombreTee*20- Math.min(nombreHoodie,nombreTee)*5 + nombreBag*8 - Math.min(nombreHoodie,nombreBag)*3)
        var embed = new Discord.MessageEmbed().setDescription(`Bonzour Monzieur, ze zuis le zbire caizzier, za a été ? Non ? Ah Monzieur Gauzier ? En m'en farler pas ! Moi j zuis juste un étuduiant et il me mène déjà la vie dur ! Il dit que j'ézorche son nom d'enzeigne !
        Mais bon il zparait qu'il est renommé dans le royaume de la mode alors...

        Sinon vous voulez régler en ligne par Paypal 💳, Bitcoin 🧧 ou directement en espèces 💶 ? **Ca vous fera ${prix} € (logos supplémentaires non inclus)**
        `).setColor('RANDOM')

        message.channel.send(embed).then(embedMessage => {
            embedMessage.react('💳');
            embedMessage.react('🧧');
            embedMessage.react('💶');

            const filter = (reaction , user) =>{
                return user.id === message.author.id && !user.bot;
            }
            const collector = embedMessage.createReactionCollector(filter, {max: 1})
            collector.on('collect', (reaction,user) => {
                if (reaction.emoji.name == '💳') {
                    message.channel.send( new Discord.MessageEmbed().setDescription('Ok voici l\'adresse Paypal : https://paypal.me/pools/c/8vkBPBWaxu \n une fois l\'achat effectué, vous pouvez refermer le ticket avec 🔓').setColor('RANDOM')).then( reaction => {
                        reaction.react("🔓");
                        const filter = (reaction , user) =>{
                            return reaction.emoji.name==="🔓" && !user.bot;
                        }
                        const collector = reaction.createReactionCollector(filter, {max: 1})
                        collector.on('collect', (reaction, user ) => {
                            const command = reaction.client.commands.get('close');
                            reaction.message.author = user;
                            command.run(reaction.message, [])
                        });
                    });
                    
                    return
                }
                if (reaction.emoji.name == '🧧') {
                    message.channel.send( new Discord.MessageEmbed().setDescription('Ok voici l\'adresse wallet accompagnée de son QRcode : bc1qh6vvclmxpysk3hcda6ttx2eqv94q2d492shmma \n \n une fois l\'achat effectué vous devez remplir cette fiche https://forms.gle/Lo2He2D4VDfV77WX9 qui permet lier la transaction à vous, puis vous pouvez refermer le ticket avec 🔓').setColor('RANDOM').setImage('https://media.discordapp.net/attachments/673187426264416266/790160269258653696/Screenshot_20201220-111350__01.jpg')).then( reaction => {
                        reaction.react("🔓");
                        const filter = (reaction , user) =>{
                            return reaction.emoji.name==="🔓" && !user.bot;
                        }
                        const collector = reaction.createReactionCollector(filter, {max: 1})
                        collector.on('collect', (reaction, user ) => {
                            const command = reaction.client.commands.get('close');
                            reaction.message.author = user;
                            command.run(reaction.message, [])
                        });
                    });
                    
                    return
                }
                if (reaction.emoji.name == '💶') {
                    message.channel.send(`Oh mon zieu vous zêtes un dealer z'est zur z'est zur je le zavais ! Vous venez nous zvoler aaaaah vitze ${config.donLucas} aidez nous: entendez vous avec ze dealer à propos d'un rdv pour la transaction z'il vous plaiiiit !`);
                    
                    message.channel.send( new Discord.MessageEmbed().setDescription('Une fois le rdv effectué, vous pourrez refermer le ticket avec 🔓')).then( reaction => {
                        reaction.react("🔓");
                        const filter = (reaction , user) =>{
                            return reaction.emoji.name==="🔓" && !user.bot;
                        }
                        const collector = reaction.createReactionCollector(filter, {max: 1})
                        collector.on('collect', (reaction, user ) => {
                            const command = reaction.client.commands.get('close');
                            reaction.message.author = user;
                            command.run(reaction.message, [])
                        });
                    });
                }

            });
            
        }).catch(err => console.error(err))

        
    }
} 