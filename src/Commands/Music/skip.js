export default {
  name: 'skip',
  aliases: ['s', 'pular', 'forceskip', 'fs'],
  ownerOnly: false,
  playerOnly: true,
  sameChannel: true,
  description: '[ 🎵 Music ] Skips the currently track.',
  options: [],
  async exec({ message, player, t, client }) {

    player.skip();

    message.reply(`**${client.emotes.music} › ${t('commands:skip.sucess')}!**`);
  },
};
