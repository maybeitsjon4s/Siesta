const Emojis = require('../../Structures/Utils/emojis.js');

module.exports = {
  name: 'shuffle',
  aliases: ['embaralhar', 'misturar'],
  cooldown: 3,
  ownerOnly: false,
  async run({ client, message, args, player, lang }) {
    if(!player) return message.reply(`**${Emojis.errado} › ${lang.commands.shuffle.noPlayer}**`);
    if(!message.member.voice.channel || message.member.voice.channel?.id !== message.guild.me.voice.channel.id) return message.reply(`**${Emojis.errado} › ${lang.commands.shuffle.channelError}**`);
    
    if(!player.queue.length) return message.reply(`**${Emojis.errado} › ${lang.commands.suffle.noQueue}**`);

    player.shuffleQueue()

    message.reply(`**${Emojis.music} › ${lang.commands.shuffle.sucess}**`)
  }
}
