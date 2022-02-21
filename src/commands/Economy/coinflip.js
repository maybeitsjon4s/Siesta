const Emojis = require(`../../Structures/Utils/emojis`);
const Guild = require("../../database/Schemas/Guild");
const User = require("../../database/Schemas/User");
module.exports = {
  name: `coinflip`,
  aliases: [`cf`],
  run: async (client, message, args, player, lang) => {
    
     const user = await User.findOne({ _id: message.author.id })
  
          if (!args[0]) return message.reply(`**${Emojis.errado} » ${lang.commands.coinflip.noValue}**`);
  
          let moneyapostado = parseInt(client.utils.convertAbbreviatedNum(args[0]))
  
          if (moneyapostado > user.money) return message.reply(`**${Emojis.errado} » ${lang.commands.coinflip.dontHave}**`);
  
            if (moneyapostado < 0 || isNaN(moneyapostado) || moneyapostado == 0) return message.reply(`**${Emojis.errado} » ${lang.commands.coinflip.invalidValue}**`);
  
          if (client.utils.coinflip()) {
            message.reply(`**${Emojis.dima} » ${lang.commands.coinflip.win} \`${moneyapostado.toLocaleString()}\`.**`);
            await User.findOneAndUpdate({ _id: message.author.id },
              {
                $set: {
                  money: user.money + moneyapostado
                }
              })
          } else {
            message.reply(`**${Emojis.dima} » ${lang.commands.coinflip.lose} \`${moneyapostado.toLocaleString()}\`.**`);
            await User.findOneAndUpdate({ _id: message.author.id },
              {
                $set: {
                  money: user.money - moneyapostado
                }
              })
          }
  },
};
