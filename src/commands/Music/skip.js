const { MessageEmbed } = require(`discord.js`);
const Emojis = require(`../../Structures/Utils/emojis`);
 const Guild = require("../../database/Schemas/Guild")

module.exports = {
  name: `skip`,
  aliases: [`s`, `pular`, "forceskip", "fs"],
  run: async (client, message, args, player, lang) => {
    
      if (!player) return message.reply(`**${Emojis.errado} » ${lang.commands.skip.noPlayer}**`);

      if (!message.member.voice.channel || message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.reply(
          `**${Emojis.errado} » ${lang.commands.skip.channelError}**`);

      player.skip();

      message.reply(`**${Emojis.music} » ${lang.commands.skip.sucess}!**`);
  },
};
