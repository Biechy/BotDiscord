const Discord = require('discord.js')

module.exports = {
    name: 'logos',
    run : message => {
        message.channel.send(new Discord.MessageEmbed().setTitle('ATTENTION : CHAQUE LOGO SERA BLANC'))
        let logo1 = new Discord.MessageEmbed()
        .setTitle('Le logo principale:" LDDMPSI Planète "')
        .setDescription(`Logo principale designé par <@271258227742736385> et <@401779679968624642> . Ca taille est de 15x15cm avec le diamètre du cercle de 11 cm`)
        .setImage('https://cdn.discordapp.com/attachments/673187426264416266/791317768024621066/logo1.png')

        .setColor('RANDOM')        
        message.channel.send(logo1)

        let logo2 = new Discord.MessageEmbed()
        .setTitle('Le logo secondaire:" LDDMPSI Planète "')
        .setDescription(`Logo secondaire qui est plus épuré mais surtout plus petit en 7x7cm avec le diamètre de 5 cm`)
        .setImage('https://cdn.discordapp.com/attachments/673187426264416266/791317779445448725/logo2.png')

        .setColor('RANDOM')        
        message.channel.send(logo2)

        let logo3 = new Discord.MessageEmbed()
        .setTitle('Le logo :" Trivial "')
        .setDescription(`Le logo Einstein Trivial créé par <@437267167017173013> et que j'ai modifié pour pouvoir permettre son impression, il existe en deux taille : 12x8 cm et 10x6 cm`)
        .setImage('https://cdn.discordapp.com/attachments/673187426264416266/791317793907277864/logo3.png')

        .setColor('RANDOM')        
        message.channel.send(logo3)

        let logo4 = new Discord.MessageEmbed()
        .setTitle('Le logo :" LDDMPSI accolade "')
        .setDescription(`Le logo fait par <@429727654057607178>. Il fait une dizaine de cm de longueur`)
        .setImage('https://cdn.discordapp.com/attachments/673187426264416266/791317806934392893/logo4.png')

        .setColor('RANDOM')        
        message.channel.send(logo4)

    }
    
}