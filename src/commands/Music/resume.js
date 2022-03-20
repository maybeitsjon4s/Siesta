const Emojis = require('../../Structures/Utils/emojis');

module.exports = {
  name: 'resume',
  aliases: ['pausar', 'dispause', 'continuar'],
  cooldown: 3,
  ownerOnly: false,
  description: '[ 🎵 Music ] Resumes the player.',
  options: [],
  async run({ client, message, args, player, lang }) {
    
      if (!player) return message.reply(`**${Emojis.errado} › ${lang.commands.resume.noPlayer}**`);

      if (!message.member.voice.channel || message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.reply(
          `**${Emojis.errado} › ${lang.commands.resume.channelError}**`
        );

      if (!player.paused) return message.reply(`**${Emojis.errado} › ${lang.commands.resume.alteradyPause}!**`);

      player.pause(false);
      message.reply(`**${Emojis.music} › ${lang.commands.resume.sucess}!**`)
  },
};
