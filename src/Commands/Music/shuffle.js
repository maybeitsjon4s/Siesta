const Emojis = require('../../Structures/Utils/emojis.js');

module.exports = {
  name: 'shuffle',
  aliases: ['embaralhar', 'misturar'],
  ownerOnly: false,
  playerOnly: true,
  sameChannel: true,
  description: '[ 🎵 Music ] Shuffle the queue.',
  options: [],
  async exec({ message,  player, t }) {
    
    if(!player.queue.length) return message.reply(`**${Emojis.errado} › ${t('commands:suffle.noQueue')}**`);

    player.shuffleQueue();

    message.reply(`**${Emojis.music} › ${t('commands:shuffle.sucess')}**`);
  }
};
