const { MessageEmbed, Discord } = require(`discord.js`);

const Emojis = require(`../../Structures/Utils/emojis`);
 const Guild = require("../../database/Schemas/Guild")

module.exports = {
  name: `clear`,
  category: `Mod`,
  aliases: [`limpar`, `clean`],
  run: async (client, message, args, player, lang) => {

        if (!message.member.permissions.has([`MANAGE_MESSAGES`]))
          return message.reply(`**${Emojis.errado} » ${lang.commands.clear.userPermission}**`);

        if (!message.guild.me.permissions.has([`MANAGE_MESSAGES`]))
          return message.reply(
            `**${Emojis.errado} » ${lang.commands.clear.myPermission}**`
          );

        const deleteCount = parseInt(args[0], 10);
        if (!deleteCount || deleteCount < 1 || deleteCount > 99)
          return message.reply(`**${Emojis.errado} » ${lang.commands.clear.invalidCount}**`);

        let fetched = await message.channel.messages.fetch({
          limit: deleteCount + 1,
        });


        message.channel.bulkDelete(fetched);
        message.channel.send(`**${Emojis.ban} » ${lang.commands.clear.finalMessage.replace('{}', deleteCount)}!**`).then((msg) => {
            setTimeout(() => {
              msg.delete();
            }, 5000);
          });
  },
};
