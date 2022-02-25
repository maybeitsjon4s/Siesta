const { MessageEmbed } = require('discord.js');

const Emojis = require('../../Structures/Utils/emojis');
const Guild = require("../../database/Schemas/Guild")

module.exports = {
  name: `prefix`,
  aliases: [`setprefix`, `prefixo`],
  usage: "{prefix}atm <user>",
  run: async (client, message, args, player, lang) => { 

      if (!message.member.permissions.has("MANAGE_GUILD")) return message.reply(`${Emojis.errado}** » ${lang.commands.prefix.errorPerm}**`)

      if (!args[0]) return message.reply(`${Emojis.errado}** » ${lang.commands.prefix.noPrefix}**`)

      if (args[0].length > 7) return message.reply(`${Emojis.errado}** » ${lang.commands.prefix.sevenLenght}**`)

      await Guild.findOneAndUpdate({
        _id: message.guild.id
      }, {
        $set: {
          prefix: args[0]
        }
      })
      message.reply(`${Emojis.config}** » Novo prefix setado com sucesso!**`)
  }
}
