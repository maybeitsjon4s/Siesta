const Emojis = require('../../Structures/Utils/emojis');

module.exports = {
  name: 'atm',
  aliases: ['bal', 'money'],
  ownerOnly: false,
  run: async (client, message, args, player, lang) => {
    
      let user = await client.utils.getUser(args[0], message);

      if (!user) user = message.author;

      const doc = await client.db.user.findOne({ _id: user.id })
    
        if(!doc) return message.reply(`${Emojis.errado}** » ${lang.commands.atm.neverUsedTheBot}**`)

        message.reply({
          content: `${Emojis.dima} **»** ${lang.commands.atm.message.replace('{user}', String(user)).replace('{value}', doc.money.toLocaleString())}!`,
        });
  },
};
