const { MessageEmbed } = require(`discord.js`);
const Emojis = require(`../../Structures/Utils/emojis`);
 const Guild = require("../../database/Schemas/Guild")

module.exports = {
  name: `resume`,
  aliases: [`pausar`, `dispause`, `continuar`],
  run: async (client, message, args, player, lang) => {
    
      if (!player) return message.reply(`**${Emojis.errado} » ${lang.commands.resume.noPlayer}**`);

      if (!message.member.voice.channel || message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.reply(
          `**${Emojis.errado} » ${lang.commands.resume.channelError}**`
        );

      if (!player.paused) return message.reply(`**${Emojis.errado} » ${lang.commands.resume.alteradyPause}!**`);

      player.pause(false);
      message.reply(`**${Emojis.music} » ${lang.commands.resume.sucess}!**`)
  },
};
