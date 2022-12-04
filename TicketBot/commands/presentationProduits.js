const Discord = require('discord.js')

module.exports = {
    name: 'produits',
    run : message => {
        let embedHoodie = new Discord.MessageEmbed()
        .setTitle('Le hoodie')
        .setDescription(`Le hoodie est un hoodie unisexe classique à coupe droite. Il est fait pour hiver et demi-saison.
        Pour ceux qui avait acheté le sweat de l'an dernier: c'est le même tout simplement.

        Trois couleur sont disponibles: cotton pink, sky blue et enfin burgundy (couleur de Paris-Saclay), taille parfaitement`)
        .setImage('https://cdn.discordapp.com/attachments/673187426264416266/792096365252444201/presentationHoodie.png')

        .setColor('RANDOM')        
        message.channel.send(embedHoodie)

        let embedTee = new Discord.MessageEmbed()
        .setTitle('Le t-shirt')
        .setDescription(`Le tee est un tee coupe droite, de très bonne qualité: doux et épais. Il est fait pour la demi-saison et hiver.

        Disponible en black comme en royal blue, taille parfaitement`)
        .setImage('https://cdn.discordapp.com/attachments/673187426264416266/791312124684795954/presentationTee.png')
        .setColor('RANDOM')        
        message.channel.send(embedTee)

        let embedBag = new Discord.MessageEmbed()
        .setTitle('Le sac')
        .setDescription(`Le sac est en toile de jute, rien de plus classique: 42 x 38 cm accompagné de sangles pour mettre sur l'épaule.
        
        Disponible en sky blue comme en burgundy`)
        .setImage('https://cdn.discordapp.com/attachments/673187426264416266/791309351406534666/presentationBag.png')
        .setColor('RANDOM')        
        message.channel.send(embedBag)

        let zoom1 = new Discord.MessageEmbed()
        .setTitle('Zoom sur le hoodie')
        .setImage('https://cdn.discordapp.com/attachments/673187426264416266/791624946430377984/temp2.png')
        message.channel.send(zoom1)

        let zoom2 = new Discord.MessageEmbed()
        .setTitle('Zoom sur le tee')
        .setImage('https://cdn.discordapp.com/attachments/673187426264416266/791347979130896434/temp1.png')
        message.channel.send(zoom2)

    }
    
}