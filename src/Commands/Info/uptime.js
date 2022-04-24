const Emojis = require('../../Structures/Utils/emojis.js');

module.exports =  {
    name: 'uptime',
    aliases: ['up'],
    ownerOnly: false,
    playerOnly: false,
    sameChannel: false,
    async exec({ client, message }) {
        message.reply(`**${Emojis.star} › Uptime: __${client.utils.formatTime(client.uptime)}__**`);
    } 
};
