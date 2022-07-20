import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

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
      content: `**${client.emotes.star} › ${t('commands:vote.message')}!**`,
      components: [
        new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel(t('commands:vote.label'))
            .setURL('https://top.gg/bot/907747074118926347/vote')
        ),
      ],
    });
  },
};
