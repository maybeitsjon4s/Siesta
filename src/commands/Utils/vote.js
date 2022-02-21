const Discord = require(`discord.js`);
const Emojis = require(`../../Structures/Utils/emojis`);
 const Guild = require("../../database/Schemas/Guild")

module.exports = {
  name: `vote`,
  run: async (client, message, args, player, lang) => {
    
        message.reply({
          content: `**${Emojis.star} » ${lang.commands.vote.message}!**`,
          components: [
            new Discord.MessageActionRow().addComponents(
              new Discord.MessageButton()
                .setStyle(`LINK`)
                .setEmoji(Emojis.botlist)
                .setLabel(lang.commands.vote.label)
                .setURL("https://top.gg/bot/907747074118926347/vote")
            ),
          ],
        });
  },
};
