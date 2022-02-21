const {
  MessageEmbed,
  Discord
} = require(`discord.js`);
const Emojis = require(`../../Structures/Utils/emojis`);
const Guild = require("../../database/Schemas/Guild")

module.exports = {
  name: `welcome`,
  aliases: [`bem-vindo`, `entrada`],
  usage: "{prefix}welcome [on/off] [channel] [msg]",
  run: async (client, message, args, player, lang) => {
    
      if (!message.member.permissions.has(`MANAGE_MESSAGES`)) return message.reply(`**${Emojis.errado} » ${lang.commands.welcome.errorPerm}**`);
      if (!args[0]) return message.reply(`**${Emojis.errado} » ${lang.commands.welcome.argsError}**`);
      if(!['on', 'off'].includes(args[0])) return message.reply(`**${Emojis.errado} » ${lang.commands.welcome.argsError} **`)

      if (args[0] == 'off') {
        await Guild.findOneAndUpdate({
          _id: message.guild.id
        }, {
          $set: {
            "welcome.status": false
          }
        })
        return message.reply(`**${Emojis.config} » ${lang.commands.welcome.disabled}**`);
      }
      if (args[0] == 'on') {
        let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
        if (!channel) return message.reply(`**${Emojis.errado} « ${langs.commands.welcome.argsError}**`);
        let msg = args.slice(2).join(' ');
        if (!msg) return message.reply(`**${Emojis.errado} » ${lang.commands.welcome.argsError}**`);

        await Guild.findOneAndUpdate({
          _id: message.guild.id
        }, {
          $set: {
            "welcome.status": true,
            "welcome.channel": channel.id,
            "welcome.message": msg
          }
        })
        message.reply(
          `**${Emojis.config} » ${lang.commands.welcome.seted}**`
        );
      }
    }
}
