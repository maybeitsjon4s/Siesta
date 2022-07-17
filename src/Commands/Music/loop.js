export default {
  name: 'loop',
  aliases: ['repetir', 'repeat'],
  ownerOnly: false,
  playerOnly: true,
  sameChannel: true,
  description: '[ 🎵 Music ] Enable/Disable the track/queue loop.',
  options: [],
  async exec({ message, player, t, client }) {

    if (!player.queue.length) {
      player.setTrackLoop(!player.trackRepeat);
      player.setQueueLoop(false);
      const trackRepeat = player.trackRepeat ? t('commands:loop.enable') : t('commands:loop.disable');
      message.reply(`**${client.emotes.music} › ${trackRepeat} ${t('commands:loop.trackSucess')}!**`);

    } else {
      player.setQueueLoop(!player.queueRepeat);
      player.setTrackLoop(false);
      const queueRepeat = player.queueRepeat ? t('commands:loop.enable') : t('commands:loop.disable');
      message.reply(`**${client.emotes.music} › ${queueRepeat} ${t('commands:loop.queueSucess')}!**`);
    }
  }
};

