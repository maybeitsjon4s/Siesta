const Emojis = require('../../Structures/Utils/emojis');

module.exports = {
  name: 'loop',
  aliases: ['repetir', 'repeat'],
  ownerOnly: false,
  playerOnly: true,
  sameChannel: true,
  description: '[ 🎵 Music ] Enable/Disable the track/queue loop.',
  options: [],
  async exec({ message, player, lang }) {

    if (!player.queue.length) {
      player.setTrackLoop(!player.trackRepeat);
      const trackRepeat = player.trackRepeat ? lang.commands.loop.enable : lang.commands.loop.disable;
      message.reply(`**${Emojis.music} › ${trackRepeat} ${lang.commands.loop.trackSucess}!**`);

    } else {
      player.setQueueLoop(!player.queueRepeat);
      const queueRepeat = player.queueRepeat ? lang.commands.loop.enable : lang.commands.loop.disable;
      message.reply(`**${Emojis.music} › ${queueRepeat} ${lang.commands.loop.queueSucess}!**`);
    }
  }
};

