const Emojis = require('../../Structures/Utils/emojis');

module.exports = {
  name: 'skip',
  aliases: ['s', 'pular', 'forceskip', 'fs'],
  ownerOnly: false,
  playerOnly: true,
  sameChannel: true,
  description: '[ 🎵 Music ] Skips the currently track.',
  options: [],
  async exec({ message, player, lang }) {
     
    player.skip();

    message.reply(`**${Emojis.music} › ${lang.commands.skip.sucess}!**`);
  },
};
