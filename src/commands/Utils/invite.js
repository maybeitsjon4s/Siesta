const { MessageActionRow, MessageButton } = require('discord.js');
const Emojis = require('../../Structures/Utils/emojis');

module.exports = {
  name: 'invite',
  run: async (client, message, args, player, lang) => {
    
        message.reply({
          content: `**${Emojis.star} » ${lang.commands.invite.message}!**`,
          components: [
            new MessageActionRow().addComponents(
              new MessageButton()
                .setStyle(`LINK`)
                .setEmoji(Emojis.heart)
                .setLabel(lang.commands.invite.buttonLabel)
                .setURL("https://discord.com/api/oauth2/authorize?client_id=907747074118926347&permissions=271641686&scope=applications.commands%20bot")
            ),
          ],
        });
  },
};
