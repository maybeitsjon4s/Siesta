const Emojis = require('../../Structures/Utils/emojis.js');

module.exports =  {
  name: 'uptime',
  aliases: ['up'],
  ownerOnly: false,
  async exec({ client, message }) {
    message.reply(`**${Emojis.star} › UpTime: ${client.utils.formatTime(client.uptime)}!**`)
  } 
}
