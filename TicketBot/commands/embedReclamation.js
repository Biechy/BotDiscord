const Discord = require('discord.js')

module.exports = {
    name: 'reclamation',
    run : message => {
        let embedAchat = new Discord.MessageEmbed()
        .setTitle('Réclamation')
        .setDescription('He yo man. T\'as un sous ?\n J\'suis le sbire relax moi donc on peut s\arranger cheal tu sais ! \n Prend un ticket 🛸 et je t\'emmene direct sur ma planète. Ok ? ')
        .setColor('RANDOM')
        

        
        message.channel.send({embed: embedAchat}).then(embedMessage => {
            embedMessage.react("🛸");
        });
        
    }
    
}