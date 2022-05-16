import { MessageActionRow, MessageButton } from 'discord.js';

export default {
  name: 'vote',
  aliases: [],
  ownerOnly: false,
  playerOnly: false,
  sameChannel: false,
  description: '[ 📚 Utils ] Show the link so you can vote me and help me grow!',
  options: [],
  async exec({ message, t, client }) {
    
    message.reply({
      content: `**${client.Emojis.star} › ${t('commands:vote.message')}!**`,
      components: [
        new MessageActionRow().addComponents(
          new MessageButton()
            .setStyle('LINK')
            .setEmoji({
              name: 'topgg',
              id: '910275555402842212',
              animated: true 
            })
            .setLabel(t('commands:vote.label'))
            .setURL('https://top.gg/bot/907747074118926347/vote')
        ),
      ],
    });
  },
};
