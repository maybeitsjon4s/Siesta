const Emojis = require('../../Structures/Utils/emojis.js')

module.exports = {
  name: 'skipto',
  aliases: ['goto', 'jump'],
  cooldown: 2,
  ownerOnly: false,
  run: async(client, message, args, player, lang) => {

    if(!player) return message.reply(`**${Emojis.errado} » ${lang.commands.skipto.noPlayer}**`);

    if (!message.member.voice.channel || message.member.voice.channel.id != message.guild.me.voice.channel.id)return message.reply(`**${Emojis.errado} » ${lang.commands.skipto.channelError}**`);

    const position = Number(args[0])

    if(!position || isNaN(position) || position < 0 || position > player.queue.length) return message.reply(`**${Emojis.errado} » ${lang.commands.skipto.invalidPosition}**`);

  player.skip(position - 1)
  message.reply(`**${Emojis.errado} » ${lang.commands.skipto.sucess.replace('{}', position)}**`)
  }
}
