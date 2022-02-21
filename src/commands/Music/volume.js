const Emojis = require(`../../Structures/Utils/emojis`);
 const Guild = require("../../database/Schemas/Guild")

module.exports = {
  name: `volume`,
  description: `[🎵 Music ] » Adjust the music volume .`,
  aliases: [`vol`],
  run: async (client, message, args, player, lang) => {

    
      if (!player) return message.reply(`**${Emojis.errado} » ${lang.commands.volume.noPlayer}**`);

      if (!message.member.voice.channel || message.member.voice.channel.id != message.guild.me.voice.channel.id)return message.reply(
          `**${Emojis.errado} » ${lang.commands.volume.channelError}**`);

      if (Number(args[0]) <= 0 || Number(args[0]) > 500 || isNaN(args[0])) return message.reply(`**${Emojis.errado} » ${lang.commands.volume.bettewnOneAnd500}**`);

      player.filters.setVolume(Number(args[0]));
      message.reply(`**${Emojis.music} » ${lang.commands.volume.sucess} ${Number(args[0])}**`);
  }
}
