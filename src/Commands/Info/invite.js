import { MessageActionRow, MessageButton } from 'discord.js';

export default {
  name: 'invite',
  aliases: [],
  ownerOnly: false,
  playerOnly: false,
  sameChannel: false,
  description: '[ 📚 Utils ] Show my invite links!',
  options: [],
  async exec({ message, t, client }) {
    
    message.reply({
      content: `**${client.Emojis.star} › ${t('commands:invite.message')}!**`,
      components: [
        new MessageActionRow().addComponents(
          new MessageButton()
            .setStyle('LINK')
            .setEmoji({
              name: 'heart1',
              id: '914564033091366942',
              animated: true
            })
            .setLabel(t('commands:invite.buttonLabel'))
            .setURL('https://discord.com/api/oauth2/authorize?client_id=907747074118926347&permissions=271641686&scope=applications.commands%20bot')
        ),
      ],
    });
  },
};
