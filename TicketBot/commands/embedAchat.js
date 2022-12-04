const Discord = require('discord.js')

module.exports = {
    name: 'achat',
    run : message => {
        let embedAchat = new Discord.MessageEmbed()
        .setTitle('Ticket d\'achat !')
        .setDescription('Voici le ticket tend attendu. \n Attention ceci n\'est pas un ticket d\'or ! Quoique... ')
        .setColor('RANDOM')
        

        
        message.channel.send({embed: embedAchat}).then(embedMessage => {
            embedMessage.react("🎫");
        });
        
    }
    
}