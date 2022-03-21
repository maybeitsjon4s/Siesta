const { MessageActionRow, MessageButton, ButtonStyle } = require('discord.js-light');
const Emojis = require('../../Structures/Utils/emojis');

module.exports = {
  name: 'invite',
  aliases: [],
  cooldown: 2,
  ownerOnly: false,
  description: '[ 📚 Utils ] Show my invite links!',
  options: [],
  async run({ client, message, args, player, lang }) {
    
        message.reply({
          content: `**${Emojis.star} › ${lang.commands.invite.message}!**`,
          components: [
            new MessageActionRow().addComponents(
              new MessageButton()
                .setStyle('LINK')
                .setEmoji({
                  name: 'heart1',
                  id: '914564033091366942',
                  animated: true
                })
                .setLabel(lang.commands.invite.buttonLabel)
                .setURL("https://discord.com/api/oauth2/authorize?client_id=907747074118926347&permissions=271641686&scope=applications.commands%20bot")
            ),
          ],
        });
  },
};
