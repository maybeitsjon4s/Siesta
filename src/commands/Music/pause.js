const Emojis = require('../../Structures/Utils/emojis');

module.exports = {
  name: 'pause',
  aliases: ['pausar'],
  run: async (client, message, args, player, lang) => {
      if (!player) return message.reply(`**${Emojis.errado} » ${lang.commands.pause.noPlayer}**`);

      if (!message.member.voice.channel || message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.reply(`**${Emojis.errado} » ${lang.commands.pause.channelError}**`);

      if (player.paused) return message.reply(`**${Emojis.errado} » ${lang.commands.pause.alteradyPause}!**`);

      player.pause(true);
      message.reply(`**${Emojis.music} » ${lang.commands.pause.sucess}!**`);
    
  }
}
