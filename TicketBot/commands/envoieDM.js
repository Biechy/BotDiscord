const config = require ('../config.json');
const fs = require('fs');
const { Emoji, Collector, Message } = require('discord.js');
Discord = require('discord.js');
const data = require("../data.json");
const { get } = require('http');


module.exports = {
    name:'envoiedm',
    guildOnly: true,
    run: async (message) => {
        data.forEach(async objet => {

            //creation du embed
            const embed = new Discord.MessageEmbed().setDescription(objet.Achat).setColor('RANDOM');

            //membre Discord
            const member = await message.client.users.fetch(objet.Discord);

            //envoie dm et recuperation
            member
                .send(embed)
                .then(message =>{
                    message.react("✅");
                    message.react("🆘");


                    const filter = (reaction, user) => {
                        return user.id != '787072429276790784';
                    }
                    
                    
                    const collector = message.createReactionCollector(filter, {max: 2}, {time:86400000 });

                    collector.on('collect', (reaction) =>{
                        if (reaction.emoji.name=="✅"){
                            member.send(
                                new Discord.MessageEmbed().setDescription("Confirmation prise en compte").setColor('RANDOM')
                            )
                            let confirmationValidee = {
                                id: objet.Discord,
                                achat: objet.Achat
                            }
                            fs.appendFileSync('./confirmation.json', JSON.stringify(confirmationValidee, null, 2))
                        }
                        if (reaction.emoji.name=="🆘"){
                            member.send(
                                new Discord.MessageEmbed().setDescription("Ouvre un ticket reclamation dans le serveur Boutique Promo").setColor('RANDOM')
                            )
                            console.log(` ${objet.Achat} a cliquer sur SOS`)
                        }
                    })
                })


        })
    }

}















 /*       for(let i in data){
            author = data[i].Discord;
            message.author.createDM().then( channel => {
                channel.send(
                    new Discord.MessageEmbed().setDescription(data[i].Achat)
                ).then(embedMessage => {
                    embedMessage.react("✅");
                    embedMessage.react("🆘");

                    const filter = (user) =>{
                        return user.id === data[i].Discord;
                    }
                    const collector = embedMessage.createReactionCollector(filter, {max: 1})
    
                    collector.on('collect', (reaction) =>{
                        if (reaction.emoji.id=="801000322587688980"){
                            console.log("Ouiiii")
                        }
                        if (reaction.emoji.id=="801000379512782898"){
                            channel.send(
                                new Discord.MessageEmbed().setDescription("Ouvre un ticket reclamation dans le serveur Boutique Promo")
                            )
                        }
                    })
    
                })
            })
        }

        
    }
} */