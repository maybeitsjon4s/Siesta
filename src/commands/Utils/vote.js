const { ActionRow, ButtonComponent, ButtonStyle } = require('discord.js');
const Emojis = require('../../Structures/Utils/emojis');

module.exports = {
  name: 'vote',
  aliases: [],
  cooldown: 2,
  ownerOnly: false,
  run: async (client, message, args, player, lang) => {
    
        message.reply({
          content: `**${Emojis.star} » ${lang.commands.vote.message}!**`,
          components: [
            new ActionRow().setComponents(
              new ButtonComponent()
                .setStyle(ButtonStyle.Link)
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