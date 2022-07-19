export default {
  name: 'skip',
  aliases: ['s', 'pular', 'forceskip', 'fs'],
  ownerOnly: false,
  playerOnly: true,
  sameChannel: true,
  description: '[ 🎵 Music ] Skips the currently track.',
  options: [],
  async exec({ message, player, t, client }) {

    if (player.queue.length === 0) return message.reply(`**${client.emotes.errado} › ${t('commands:skip.error')}!**`);
      
    player.skip();

    message.reply(`**${client.emotes.music} › ${t('commands:skip.sucess')}!**`);
  },
};
