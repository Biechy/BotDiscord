const fs = require('fs')
 
module.exports = {
    run: async (message, args, client) => {
        const channel = message.mentions.channels.first() || message.channel
        if (!message.client.db.tickets[channel.id] ) return message.channel.send('Ce salon n\'est pas un ticket.')
        if (!message.member.hasPermission('MANAGE_MESSAGES') && (message.client.db.tickets[channel.id].author)  !== message.author.id) return message.channel.send('Vous n\'avez pas la permission de fermer ce ticket.')
        delete message.client.db.tickets[channel.id]
        fs.writeFileSync('./db.json', JSON.stringify(message.client.db))
        await message.channel.send(`Le ticket ${channel.name} a été fermé !`)
        channel.delete()
    },
    name: 'close',
    guildOnly: true
}