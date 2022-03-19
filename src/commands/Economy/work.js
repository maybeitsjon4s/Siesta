const Emojis = require(`../../Structures/Utils/emojis`);

module.exports = {
  name: 'work',
  aliases: ['trabalhar'],
  ownerOnly: false,
  async run({ client, message, args, player, lang }) {

     const user = await client.db.user.findOne({ _id: message.author.id, })

        if (user.cooldowns.work !== null && 600000 - (Date.now() - user.cooldowns.work) > 0) {
          message.reply(
            `**${
              Emojis.errado
            } › ${lang.commands.work.cooldown} \`${client.utils.formatTime(600000 - (Date.now() - user.cooldowns.work))}\`**`
          );
        } else {
          let amount = Math.floor(Math.random() * 2500) + 2000;
          if(user.vip) amount = amount * 2

          message.reply(
            `**${Emojis.dima} › ${
              message.author
            }  ${lang.commands.work.sucess.replace('{}', amount.toLocaleString())}**`
          );

          await client.db.user.findOneAndUpdate({ _id: message.author.id }, 
            {
            $set: {
              "cooldowns.work": Date.now(),
              money: user.money + amount 
            }
          })
        }
      }
    }
