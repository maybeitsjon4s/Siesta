const Emojis = require('../../Structures/Utils/emojis')

module.exports = {
  name: 'daily',
  aliases: ['diario', 'd'],
  ownerOnly: false,
  async run({ client, message, args, player, lang }) {
    
    const user = await client.db.user.findOne({ _id: message.author.id })

        if (user.cooldowns.daily !== null && 86400000 - (Date.now() - user.cooldowns.daily) > 0) {
          return message.reply(`**${Emojis.errado} › ${lang.commands.daily.cooldown} \`${client.utils.formatTime(86400000 - (Date.now() - user.cooldowns.daily))}\`** `);
        } else {
          let amount = Math.floor(Math.random() * 5000) + 2500;
          if (user.vip) amount = amount * 2

          await client.db.user.findOneAndUpdate({
            _id: message.author.id
          }, {
            $set: {
              "cooldowns.daily": Date.now(),
              money: user.money + amount
            }
          })

          message.reply(`**${Emojis.dima} › ${message.author} ${lang.commands.daily.won.replace('{amount}', amount.toLocaleString())}!**`);
        }
  }
}
