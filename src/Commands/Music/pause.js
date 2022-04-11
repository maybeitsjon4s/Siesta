const Emojis = require('../../Structures/Utils/emojis');

module.exports = {
  name: 'pause',
  aliases: ['pausar'],
  playerOnly: true,
  sameChannel: true,
  ownerOnly: false,
  description: '[ 🎵 Music ] Pauses the currently playing track.',
  options: [],
  async exec({ message, player, lang }) {

    if (player.paused) return message.reply(`**${Emojis.errado} › ${lang.commands.pause.alteradyPause}!**`);

    player.pause(true);
    message.reply(`**${Emojis.music} › ${lang.commands.pause.sucess}!**`);
    
  }
};
