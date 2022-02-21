const { MessageEmbed, Discord } = require(`discord.js`);
const Emojis = require(`../../Structures/Utils/emojis`);
 const Guild = require("../../database/Schemas/Guild");
const User = require("../../database/Schemas/User");

module.exports = {
  name: `pay`,
  category: `economy`,
  aliases: [`pagar`],
  run: async (client, message, args, player, lang) => {

        let user = await client.utils.getUser(args[0], message);
        const author = await User.findOne({ _id: message.author.id })

        if (!user) return message.reply(`**${Emojis.errado} » ${lang.commands.pay.noMention}**`);

        const target = await User.findOne({ _id: user.id })

        if (user.id == message.author.id) return message.reply(`**${Emojis.errado} » ${lang.commands.pay.payYourSelf}!**`);
        const value = parseInt(client.utils.convertAbbreviatedNum(args[1]))
        if (!args[1] || value < 0 || isNaN(value)) return message.reply(`**${Emojis.errado} » ${lang.commands.pay.validValue}**`);

        if (author.money < value) return message.reply(`**${Emojis.errado} » ${lang.commands.pay.noDiamonds}!**`);

        if(!target) return message.reply(`${Emojis.errado}** » ${lang.commands.pay.neverUsed}!**`)

        message.reply(`${Emojis.dima}** » ${message.author} ${lang.commands.pay.payed.replace('{user}', String(user)).replace('{value}', value.toLocaleString())}!**`);

        await User.findOneAndUpdate({ _id: message.author.id },
          {
            $set: {
              money: author.money - value
            }
          })
        await User.findOneAndUpdate({ _id: user.id },
          {
            $set: {
              money: target.money + value
            }
          })
      }
  }
