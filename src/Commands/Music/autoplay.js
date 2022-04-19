const Emojis = require('../../Structures/Utils/emojis.js');

module.exports = {
  name: 'autoplay',
  aliases: [],
  ownerOnly: false,
  playerOnly: true,
  sameChannel: true,
  description: '[ 🎵Music ] Enable/disable the autoplay',
  options: [],
  async exec({  message, player, t }) {

    if(player.autoplay) {
      player.autoplay.status = false;
      player.autoplay.track = null;
      message.reply(`**${Emojis.music} › ${t('commands:autoplay.disabled')}**`);
    } else {
      player.autoplay = {
        status: true,
        track: player.current
      };
      message.reply(`**${Emojis.music} › ${t('commands:autoplay.activated')}**`);
    }
  },
};
