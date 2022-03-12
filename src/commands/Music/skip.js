const Emojis = require('../../Structures/Utils/emojis');

module.exports = {
  name: 'skip',
  aliases: ['s', 'pular', 'forceskip', 'fs'],
  cooldown: 3,
  ownerOnly: false,
  run: async (client, message, args, player, lang) => {
    
      if (!player) return message.reply(`**${Emojis.errado} › ${lang.commands.skip.noPlayer}**`);

      if (!message.member.voice.channel || message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.reply(
          `**${Emojis.errado} › ${lang.commands.skip.channelError}**`);

      player.skip();

      message.reply(`**${Emojis.music} › ${lang.commands.skip.sucess}!**`);
  },
};
