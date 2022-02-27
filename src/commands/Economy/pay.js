const Emojis = require(`../../Structures/Utils/emojis`);

module.exports = {
  name: 'pay',
  aliases: ['pagar'],
  run: async (client, message, args, player, lang) => {

        let user = await client.utils.getUser(args[0], message);
        const author = await client.db.user.findOne({ _id: message.author.id })

        if (!user) return message.reply(`**${Emojis.errado} » ${lang.commands.pay.noMention}**`);

        const target = await client.db.user.findOne({ _id: user.id })

        if(!target) return message.reply(`${Emojis.errado}** » ${lang.commands.pay.neverUsed}!**`)

        if (user.id == message.author.id) return message.reply(`**${Emojis.errado} » ${lang.commands.pay.payYourSelf}!**`);

        if (!args[1]) return message.reply(`**${Emojis.errado} » ${lang.commands.pay.validValue}**`);

        const value = parseInt(client.utils.convertAbbreviatedNum(args[1]))

        if (!args[1] || value < 0 || isNaN(value)) return message.reply(`**${Emojis.errado} » ${lang.commands.pay.validValue}**`);

        if (author.money < value) return message.reply(`**${Emojis.errado} » ${lang.commands.pay.noDiamonds}!**`);

        message.reply(`${Emojis.dima}** » ${message.author} ${lang.commands.pay.payed.replace('{user}', String(user)).replace('{value}', value.toLocaleString())}!**`);

        await client.db.user.findOneAndUpdate({ _id: message.author.id },
          {
            $set: {
              money: author.money - value
            }
          })
        await client.db.user.findOneAndUpdate({ _id: user.id },
          {
            $set: {
              money: target.money + value
            }
          })
      }
  }
