const { MessageEmbed, Discord } = require(`discord.js`);
const Emojis = require(`../../Structures/Utils/emojis`);
const Guild = require("../../database/Schemas/Guild")
const User = require("../../database/Schemas/User")
module.exports = {
  name: `aboutme`,
  aliases: [`sobremim`, "about", "sobre"],
  run: async (client, message, args, player, lang) => {

    const aboutme = args.join(' ')
        if (!aboutme) return message.reply(`**${Emojis.errado} » ${lang.commands.about.noArgs}**`);

        message.reply(`**${Emojis.heart} » ${lang.commands.about.sucess}!**`);
        await User.findOneAndUpdate({ _id: message.author.id },
          {
            $set: {
              about: aboutme
            }
          })
  },
};
