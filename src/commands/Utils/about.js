const Emojis = require('../../Structures/Utils/emojis')

module.exports = {
  name: 'aboutme',
  aliases: ['sobremim', 'about', 'sobre'],
  cooldown: 6,
  ownerOnly: false,
  async run({ client, message, args, player, lang }) {

    const aboutme = args.join(' ')
        if (!aboutme) return message.reply(`**${Emojis.errado} › ${lang.commands.about.noArgs}**`);

        message.reply(`**${Emojis.heart} › ${lang.commands.about.sucess}!**`);
        await client.db.user.findOneAndUpdate({ _id: message.author.id },
          {
            $set: {
              about: aboutme
            }
          })
  },
};