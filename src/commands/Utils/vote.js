const { MessageActionRow, MessageButton, ButtonStyle } = require('discord.js-light');
const Emojis = require('../../Structures/Utils/emojis');

module.exports = {
  name: 'vote',
  aliases: [],
  cooldown: 2,
  ownerOnly: false,
  async run({ client, message, args, player, lang }) {
    
        message.reply({
          content: `**${Emojis.star} › ${lang.commands.vote.message}!**`,
          components: [
            new MessageActionRow().addComponents(
              new MessageButton()
                .setStyle('LINK')
                .setEmoji({
                  name: 'topgg',
                  id: '910275555402842212',
                  animated: true 
                })
                .setLabel(lang.commands.vote.label)
                .setURL("https://top.gg/bot/907747074118926347/vote")
            ),
          ],
        });
  },
};