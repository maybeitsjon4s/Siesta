const Emojis = require('../../Structures/Utils/emojis.js');

module.exports = {
  name: 'autoplay',
  aliases: [],
  ownerOnly: false,
  playerOnly: true,
  sameChannel: true,
  description: '[ 🎵Music ] Enable/disable the autoplay',
  options: [],
  async exec({  message, player, lang }) {

    if(player.autoplay) {
      player.autoplay = false;
      message.reply(`**${Emojis.music} › ${lang.commands.autoplay.disabled}**`);
    } else {
      player.autoplay = true;
      message.reply(`**${Emojis.music} › ${lang.commands.autoplay.activated}**`);
    }
  },
};
